import { TrafficReport} from "./interfaces/trafficData";
import {readDeviceList, initializeTrafficReport, getAll, calculateTraffic} from './get/traffic';
import {submitToDB} from '../database/handler';
import {simplified_report, detailed_report} from './format/message';

export async function getReport(): Promise<string> {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Process started at: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return deviceList
    }    
    const detailedReport: TrafficReport = { Proveedores: [], Transportes: [], BNG: [], FTTH: [] };
    const simpleReport: TrafficReport = initializeTrafficReport(deviceList);
    const rawOutput: Array<Record<string, any>> = [[], [], [], []];

    await getAll(deviceList, rawOutput);
    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);
    const simpleResult = simplified_report(simpleReport, startTime);
    const detailedResult = detailed_report(detailedReport, startTime);
    const resultMessage = simpleResult + detailedResult;
    return resultMessage;
}

export async function autoGetReport() {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Generando reporte de las: ${startTime}`);
            
    const deviceList = readDeviceList();
    if (typeof deviceList === 'string'){        
        return deviceList
    }    
    const detailedReport: TrafficReport = { Proveedores: [], Transportes: [], BNG: [], FTTH: [] };
    const simpleReport: TrafficReport = initializeTrafficReport(deviceList);
    const rawOutput: Array<Record<string, any>> = [[], [], [], []];

    await getAll(deviceList, rawOutput);
    calculateTraffic(deviceList, rawOutput, detailedReport, simpleReport);
    const simpleResult = simplified_report(simpleReport, startTime);
    const detailedResult = detailed_report(detailedReport, startTime);
    submitToDB(detailedReport, simpleResult, detailedResult);
}