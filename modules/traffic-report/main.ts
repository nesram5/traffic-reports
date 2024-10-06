import { iTrafficReport } from "./interfaces/i-traffic-data";
import { readDeviceList, getAll } from './get/traffic-data';
import { initializeSimpleReport, calculateTraffic } from './calculate/traffic'
import { submitToDB } from '../handlerDB/handler';
import { simplified_report, detailed_report } from './format/message';


export async function getReport(): Promise<string> {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Process started at: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return deviceList
    }    
    const detailedReport: iTrafficReport = {};
    const { simpleReport: simpleReport, trafficReportTypes } = initializeSimpleReport(deviceList);
    const rawOutput: Array<Record<string, any>> = [[], [], [], [], [], [], [], [], [], []];

    await getAll(deviceList, rawOutput);
    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);
    const simpleResult = simplified_report(simpleReport, startTime, trafficReportTypes);
    const detailedResult = detailed_report(detailedReport, startTime, trafficReportTypes);
    const resultMessage = simpleResult + detailedResult;
    //submitToDB(simpleResult, detailedResult);
    return resultMessage;
}

export async function autoGetReport() {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Generating report of: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return deviceList
    }    
    const detailedReport: iTrafficReport = {};
    const { simpleReport: simpleReport, trafficReportTypes } = initializeSimpleReport(deviceList);
    const rawOutput: Array<Record<string, any>> = [[], [], [], []];

    await getAll(deviceList, rawOutput);
    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);
    const simpleResult = simplified_report(simpleReport, startTime, trafficReportTypes);
    const detailedResult = detailed_report(detailedReport, startTime, trafficReportTypes);
    //submitToDB(simpleResult, detailedResult);
}

export async function testing1() {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Generating report of: ${startTime}`);

    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return deviceList
    }    
    const detailedReport: iTrafficReport = {};
    const { simpleReport: simpleReport, trafficReportTypes } = initializeSimpleReport(deviceList);
    const rawOutput: Array<Record<string, any>> = [[], [], [], [], [], [], [], [], [], []];

    await getAll(deviceList, rawOutput);
    console.log(rawOutput);
    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);
    const simpleResult = simplified_report(simpleReport, startTime, trafficReportTypes);
    const detailedResult = detailed_report(detailedReport, startTime, trafficReportTypes);
}