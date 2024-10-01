import fs from 'fs';
import path from 'path';
import snmp from 'snmp-native';
import { detailed_report, simplified_report } from './reportFormat';
import { TrafficData, TrafficReport } from './interfaces';
import { submitToDB } from '../database/handler';

export async function startScan(): Promise<string> {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Process started at: ${startTime}`);

    const data = openFile();
    const detailedReport: TrafficReport = { Proveedores: [], Transportes: [], BNG: [], FTTH: [] };
    const trafficReport: TrafficReport = initializeTrafficReport(data);

    const sampleData: Array<Record<string, any>> = [[], [], [], []];
    await getAll(data, sampleData);
    calculateTraffic(data, sampleData, detailedReport, trafficReport);
    const simpleReport = simplified_report(trafficReport, startTime);
    const resultMessage = simpleReport + detailed_report(detailedReport, startTime);
    submitToDB(detailedReport, simpleReport);
    return resultMessage;
}

function openFile(): TrafficData {
    const filePath = path.join(__dirname, '/data/traffic_data.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

async function get(target: string, oids: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let timeout = [1000];
        let community_name = 'public';
        const session = new snmp.Session();
        session.get({ oid: oids, host: target, timeouts: timeout, community: community_name }, (error, varbinds) => {
            session.close();
            if (error) {
                reject(error);
            } else {
                resolve(varbinds[0].value);
            }
        });
    });
}

async function getAll(data: TrafficData, sampleData: Array<Record<string, any>>) {
    for (let i = 0; i < 4; i++) {
        for (const device of Object.values(data)) {
            try {
                const sample = await get(device.ip, device.oid);
                sampleData[i][device.name] = sample;
            } catch (error) {
                console.log(error);
                sampleData[i][device.name] = false;
            }
        }
        if (i < 3) {
            await new Promise(resolve => setTimeout(resolve, 20000));
        }
    }
}

function calculateResult(firstPass: string, secondPass: string): number | string {
    try {
        const counter1 = BigInt(firstPass);
        const counter2 = BigInt(secondPass);
        const deltaCounter = counter2 - counter1;
        const deltaBits = deltaCounter * 8n;
        const mbps = deltaBits / 20n / 1000000n;
        return Number(mbps);
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

function calculateTraffic(data: TrafficData, sampleData: Array<Record<string, any>>, detailedReport: TrafficReport, trafficReport: TrafficReport) {
    for (const device of Object.values(data)) {
        const name: string = device.name;
        const group: string = device.group;
        const property: string = device.type;
        let avgResult: number | string;

        if (sampleData[0][name] && sampleData[1][name] && sampleData[2][name] && sampleData[3][name]) {
            let result1: number | string = calculateResult(sampleData[0][name], sampleData[1][name]);
            let result2: number | string = calculateResult(sampleData[2][name], sampleData[3][name]);
            if (!result1 || !result2 || typeof result1 === 'string' || typeof result2 === 'string') {
                avgResult = 0;
            } else {
                avgResult = (result1 + result2) / 2;
            }

            // Añadiendo el valor en detailedReport
            detailedReport[property as keyof TrafficReport].push({ group, id: device.key, mbps: avgResult, name: name });

            // Actualizando el tráfico reportado
            const existing = trafficReport[property as keyof TrafficReport].find(item => item.group === group);
            if (existing) {
                existing.mbps = Number(existing.mbps) + Number(avgResult);
            } else {
                trafficReport[property as keyof TrafficReport].push({ group, name: name, id: device.key, mbps: Number(avgResult) });
            }
        } else {
            detailedReport[property as keyof TrafficReport].push({ group, name: name,  id: device.key, mbps: `Error: No access to ${device.ip} ${device.name}` });
        }
    }
}

function initializeTrafficReport(data: TrafficData): TrafficReport {
    const simplified: TrafficReport = { Proveedores: [], Transportes: [], BNG: [], FTTH: [] };
    for (const device of Object.values(data)) {
        const property: string = device.type;
        // Se asegura de que existe el grupo inicializado
        if (!simplified[property as keyof TrafficReport].some(item => item.group === device.group)) {
            simplified[property as keyof TrafficReport].push({ group: device.group, name: device.name, id: device.key, mbps: 0 });
        }
    }
    return simplified;
}
