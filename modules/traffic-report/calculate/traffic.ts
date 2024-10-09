import { iTrafficData, iTrafficReport } from '../interfaces/traffic-data';

export function calculateTraffic(
    data: iTrafficData,
    sampleData: Array<Record<string, any>>,
    detailedReport: iTrafficReport,
    simpleReport: iTrafficReport,
    samplesNumber: number) {
    for (const device of Object.values(data)) {
        const name: string = device.name;
        const group: string = device.group;
        const deviceType: string = device.type;
        const ip = device.ip;
        const substract = device.substract;

       //Check if values exists in the array
        let allSamplesExist = true;
        for (let i = 0; i < samplesNumber; i++) {
            if (!sampleData[i][name]) {
                allSamplesExist = false;
                break; 
            }
        }
        if (!allSamplesExist) {
            addDetailedReportError(detailedReport, deviceType, group, name, ip, substract);
            continue;
        }
        //Process Data
        const result:any = [];
        for (let i = 0; i < samplesNumber; i += 2) {
            if (sampleData[i] && sampleData[i + 1]) { // Ensure that both elements exist
                result.push(convertToMbps(sampleData[i][name], sampleData[i + 1][name]));
            }
        }
        let avgResult: number = calculateAverage(result, substract, samplesNumber) ;     
        //Export processed data
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

function calculateAverage(result: number[] | string[], substract: string, samplesNumber: number ): number {
    const numberOfresults = samplesNumber / 2
   
    let total = 0;
    let zeroValues = 0;
    let prevValue= [];
    let i = 0;
    for (let value of result){
        if (value === 0) zeroValues+=1;        
        if (typeof value === 'string') { 
            zeroValues += 1; 
            value = 0;
        }
        //Prevent wrong values from snmp
        prevValue[i] = value;
        if(!i && (value*2) > prevValue[i] ){
            value = 0;
            zeroValues += 1;
        }
        total += Number(value)
        i++;
    }
    
    if (zeroValues === numberOfresults ) { return 0 };
    //Correct average
    if (zeroValues) { 
        let divide = (numberOfresults - zeroValues);  
        total = (total / divide);
        return total;
    };

    total/=numberOfresults;

    //Convert value to negative for be substracted at the push function
    if (substract === "yes"){
        total*=-1;
    }
    return total
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
    //Convert value to negative for be substracted at the message function
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
      let existing = simpleReport[deviceType].find(item => item.group === group);
        
    if (existing) {
        //Convert value to negative for be substracted
        if (substract === "yes") {
            mbps = mbps * -1;
        }
        existing.mbps = (existing.mbps as number) + mbps;
       
    } else {
        simpleReport[deviceType].push({ group, name, mbps, substract });
    }

}

function convertToMbps(firstPass: any[], secondPass: any[]): number | string {
    try {
        const seconds = compareTimestamps(firstPass[1], secondPass[1]);
        const counter1 = BigInt(Number(firstPass[0]));
        const counter2 = BigInt(Number(secondPass[0]));
        const deltaCounter = counter2 - counter1;
        const deltaBits = deltaCounter * 8n;
        const mbps = deltaBits / seconds / 1000000n;
        return Number(mbps);
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

function compareTimestamps(timestamp1: number, timestamp2: number): bigint {
    const differenceInMilliseconds = Math.abs(Number(timestamp1) - Number(timestamp2)); 
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    return BigInt(differenceInSeconds);
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

export function createEmptyArray(n: number): Array<any[]> {
    return Array.from({ length: n }, () => []);
}