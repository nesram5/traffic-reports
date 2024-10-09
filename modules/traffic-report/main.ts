import { iTrafficReport } from "./interfaces/traffic-data";
import { readDeviceList, getAll } from './get/traffic-data';
import { initializeSimpleReport, createEmptyArray, calculateTraffic } from './calculate/traffic'
import { submitToDB } from '../handlerDB/submit';
import { fetchTrafficDataFromDB } from '../handlerDB/fetch';
import { simplified_report, detailed_report } from './format/message';

export async function getReport(
    samplesNumber: number = 8, 
    samplesInterval: number = 15000
    ): Promise<{ simpleResult:string, detailedResult:string}>  
{
    const startTime = new Date().toLocaleTimeString();

    console.log(`Process started at: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return {simpleResult: deviceList, detailedResult: deviceList}
    }

    let detailedReport: iTrafficReport = {};

    let { simpleReport: simpleReport, trafficReportTypes } = initializeSimpleReport(deviceList);
   
    let rawOutput = createEmptyArray(samplesNumber);

    await getAll(deviceList, rawOutput, samplesInterval);

    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport, samplesNumber);

    let simpleResult = simplified_report(simpleReport, trafficReportTypes);
    let detailedResult = detailed_report(detailedReport, trafficReportTypes);
 
    return { simpleResult, detailedResult}
}

export async function autoGetReport() {

    let {simpleResult: simpleResult, detailedResult: detailedResult} = await getReport(3,180000);
    submitToDB(simpleResult, detailedResult);
    fetchTrafficDataFromDB();
}