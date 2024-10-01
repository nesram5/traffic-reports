import { TrafficReport } from '../trafficReport/interfaces/trafficData'
import mongoose from 'mongoose';
import fs from 'fs';
import { CACHE_FILE_PATH } from '../../server';

// Function to fetch the latest data from MongoDB and write to the cache file
const compiledTrafficDataSchema = new mongoose.Schema({
        deviceId: { type: String, required: true }, 
        data: [
            {
                timestamp: { type: Date, required: true }, 
                compiledReport: { type: String, required: true }
            }
        ]
});
const CompTrafficData = mongoose.model('compiledtraffic', compiledTrafficDataSchema);


const looseTrafficDataSchema = new mongoose.Schema({
    deviceId: { type: String, required: true }, 
    data: [
        {
            timestamp: { type: Date, required: true },
            group: { type: String, required: true }, 
            name: { type: String, required: true },    
            mbps: { type: Number, required: true }      
        }
    ]
});
const LooseTrafficDataSchema = mongoose.model('trafficreports', looseTrafficDataSchema);


export async function fetchTrafficDataFromDatabase () {
    try {
      const trafficData: {} = await CompTrafficData.find().sort({ 'data.timestamp': 1 });
        fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(trafficData, null, 2));
        console.log('Traffic data cache file updated');
    } catch (err) {
        console.error('Error fetching traffic data:', err);
    }
}

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Conexión exitosa a la base de datos');
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    }
}

async function pushLooseTrafficData(deviceId: string, newTrafficRecord: {}) {
    try {
        
        const result = await LooseTrafficDataSchema.findOneAndUpdate(
            { deviceId: deviceId }, 
            {
                $push: { 
                    data: newTrafficRecord
                }
            },
            { new: true, upsert: true } 
        );
    } catch (error) {
        console.error('Error adding data:', error);
    }
}
async function pushCompiledReport(newTrafficRecord: {}) {
    try {
        
        const result = await CompTrafficData.findOneAndUpdate(
            { deviceId: "compiled_rep" }, 
            {
                $push: { 
                    data: newTrafficRecord
                }
            },
            { new: true, upsert: true } 
        );
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

async function submitLooseTrafficData(category: object, date: Date) {
    for (const [group, device] of Object.entries(category)) {
        let mbpsChecked = device.mbps;
        if (typeof device.mbps == 'string') mbpsChecked = 0;
        const dataToInsert = {
            timestamp: date, 
            group: device.group,
            mbps: mbpsChecked
        };
        await pushLooseTrafficData(device.id, dataToInsert);
    }
}
export  async function submitToDB(detailedReport: TrafficReport, simpleResult: string, detailedResult: string) {
    
    const date = new Date();

    await submitLooseTrafficData(detailedReport.Proveedores, date);
    await submitLooseTrafficData(detailedReport.Transportes, date);
    await submitLooseTrafficData(detailedReport.BNG, date);
    await submitLooseTrafficData(detailedReport.FTTH, date);
    
    const dataToInsert = {
        timestamp: date, 
        simpleReport: simpleResult,
        detaildReport: detailedResult

    }
    await pushCompiledReport(dataToInsert);  
}
