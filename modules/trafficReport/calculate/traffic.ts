import { iTrafficData, iTrafficReport } from '../interfaces/iTrafficData';

export function calculateTraffic(
    data: iTrafficData,
    sampleData: Array<Record<string, any>>,
    detailedReport: iTrafficReport,
    simpleReport: iTrafficReport
) {
    for (const device of Object.values(data)) {
        const name: string = device.name;
        const group: string = device.group;
        const deviceType: string = device.type;
        const ip = device.ip;
        const substract = device.substract;
        console.log(name, " ", substract);
        if (!sampleData[0][name] || !sampleData[1][name] || !sampleData[2][name] || !sampleData[3][name]) {
            addDetailedReportError(detailedReport, deviceType, group, name, ip, substract);
            continue;
        }

        const result1: number | string = convertToMbps(sampleData[0][name], sampleData[1][name]);
        const result2: number | string = convertToMbps(sampleData[2][name], sampleData[3][name]);

        let avgResult: number = calculateAverage(result1, result2);

        pushDetailedReport(detailedReport, deviceType, group, name, avgResult, substract);
        pushSimpleReport(simpleReport, deviceType, group, name, avgResult, substract);
    }
}

function addDetailedReportError(
    detailedReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    ip: string,
    substract: string
) {
    if (!detailedReport[deviceType]) {
        detailedReport[deviceType] = [];
    }
    detailedReport[deviceType].push({
        group,
        name,
        mbps: `Error: No access to ${ip} ${name}`,
        substract,
    });
}

function calculateAverage(result1: number | string, result2: number | string): number {
    console.log(result1," Resultado 1   \n",result2, "Resultado 2"  )
    if (typeof result1 === 'string' || typeof result2 === 'string') {
        return 0;
    }
    if (result1 === 0 || result2 === 0) {
        return Number(result1) + Number(result2);
    }
    return ((Number(result1) + Number(result2))) / 2;
}

function pushDetailedReport(
    detailedReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    mbps: number,
    substract: string
) {
    if (!detailedReport[deviceType]) {
        detailedReport[deviceType] = [];
    }
    if (substract === "yes") {
        mbps = mbps * -1;
    }
    detailedReport[deviceType].push({ group, mbps, name, substract });
}

function pushSimpleReport(
    simpleReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    mbps: number,
    substract: string
) {
    if (!simpleReport[deviceType]) {
        simpleReport[deviceType] = [];
    }

    const existing = simpleReport[deviceType].find(item => item.group === group);
        
    if (existing) {
        if (substract === "yes") {
            mbps = mbps * -1;
        }
        // Sumar el nuevo valor de mbps al existente
        existing.mbps = (existing.mbps as number) + mbps;
    } else {
        // Si no existe el grupo, agregar uno nuevo
        simpleReport[deviceType].push({ group, name, mbps, substract });
    }
}

function convertToMbps(firstPass: string, secondPass: string): number | string {
    try {
        const counter1 = BigInt(firstPass);
        const counter2 = BigInt(secondPass);
        const deltaCounter = counter2 - counter1;
        const deltaBits = deltaCounter * 8n;
        const mbps = deltaBits / 30n / 1000000n;
        return Number(mbps);
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

export function initializeSimpleReport(data: iTrafficData): { simpleReport: iTrafficReport, trafficReportTypes: string[] } {
    const simpleReport: iTrafficReport = {};
    const trafficReportTypes = []
    for (const key in data) {
        const { type, group, name, substract } = data[key];
        
        if (!simpleReport[type]) {
            simpleReport[type] = [];
            trafficReportTypes.push(type);
            simpleReport[type].push({
                group,
                name,
                mbps: 0,
                substract
            });
        }
    }
    return { simpleReport, trafficReportTypes };
}