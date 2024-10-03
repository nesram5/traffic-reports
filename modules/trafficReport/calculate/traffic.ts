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
        
        if (!sampleData[0][name] || !sampleData[1][name] || !sampleData[2][name] || !sampleData[3][name]) {
            addDetailedReportError(detailedReport, deviceType, group, name, device.ip, device.substract);
            continue;
        }

        const result1: number | string = convertToMbps(sampleData[0][name], sampleData[1][name]);
        const result2: number | string = convertToMbps(sampleData[2][name], sampleData[3][name]);

        let avgResult: number = calculateAverage(result1, result2);

        pushDetailedReport(detailedReport, deviceType, group, name, avgResult, device.substract);
        pushSimpleReport(simpleReport, deviceType, group, name, avgResult, device.substract);
    }
}

function addDetailedReportError(
    detailedReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    ip: string,
    substract: boolean
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
    if (typeof result1 === 'string' || typeof result2 === 'string') {
        return 0;
    }
    if (!result1 || !result2) {
        return Number(result1) + Number(result2);
    }
    return (Number(result1) + Number(result2)) / 2;
}

function pushDetailedReport(
    detailedReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    mbps: number,
    substract: boolean
) {
    if (!detailedReport[deviceType]) {
        detailedReport[deviceType] = [];
    }
    detailedReport[deviceType].push({ group, mbps, name, substract });
}

function pushSimpleReport(
    simpleReport: iTrafficReport,
    deviceType: string,
    group: string,
    name: string,
    mbps: number,
    substract: boolean
) {
    if (!simpleReport[deviceType]) {
        simpleReport[deviceType] = [];
    }

    const existing = simpleReport[deviceType].find(item => item.group === group);

    if (existing) {
        if (existing.substract) {
            existing.mbps = Number(existing.mbps) > mbps ? Number(existing.mbps) - mbps : mbps - Number(existing.mbps);
        } else {
            existing.mbps = Number(existing.mbps) + mbps;
        }
    } else {
        simpleReport[deviceType].push({ group, name, mbps, substract });
    }
}

function convertToMbps(firstPass: string, secondPass: string): number | string {
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