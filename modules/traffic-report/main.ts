import { iTrafficReport } from "./interfaces/traffic-data";
import { readDeviceList, getAll } from './get/traffic-data';
import { initializeSimpleReport, createEmptyArray, calculateTraffic } from './calculate/traffic'
import { submitToDB } from '../handlerDB/submit';
import { fetchTrafficDataFromDB } from '../handlerDB/fetch';
import { simplified_report, detailed_report } from './format/message';


//Global variables
export const NUMBER_OF_SAMPLES = 4;
export const SAMPLE_INTERVAL = 30000;

export async function getReport(): Promise<{ simpleResult:string, detailedResult:string}>  {
    const startTime = new Date().toLocaleTimeString();

    console.log(`Process started at: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return {simpleResult: deviceList, detailedResult: deviceList}
    }

    let detailedReport: iTrafficReport = {};

    let { simpleReport: simpleReport, trafficReportTypes } = initializeSimpleReport(deviceList);
   
    let rawOutput = createEmptyArray(NUMBER_OF_SAMPLES);

    await getAll(deviceList, rawOutput, SAMPLE_INTERVAL);

    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);

    let simpleResult = simplified_report(simpleReport, startTime, trafficReportTypes);
    let detailedResult = detailed_report(detailedReport, startTime, trafficReportTypes);
 
    return { simpleResult, detailedResult}
}

export async function autoGetReport() {
    let {simpleResult: simpleResult, detailedResult: detailedResult} = await getReport()
    submitToDB(simpleResult, detailedResult);
    fetchTrafficDataFromDB();
}