import { TrafficReport } from '../trafficReport/interfaces'
import mongoose from 'mongoose';
import fs from 'fs';
import { CACHE_FILE_PATH } from '../../app';


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


const trafficDataSchema = new mongoose.Schema({
    deviceId: { type: String, required: true }, 
    data: [
        {
            timestamp: { type: Date, required: true }, 
            group: { type: String, required: true },    
            mbps: { type: Number, required: true }      
        }
    ]
});
const TrafficDataSchema = mongoose.model('trafficreports', trafficDataSchema);


export async function fetchTrafficDataFromDatabase () {
    try {
      const trafficData: {} = await CompTrafficData.find().sort({ 'data.timestamp': 1 });
        fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(trafficData, null, 2));
        console.log('Traffic data cache file updated');
    } catch (err) {
        console.error('Error fetching traffic data:', err);
    }
}

export async function serveDB(): Promise< string | {}> {
    
    try {
      const trafficData: {} = await CompTrafficData.find().sort({ 'data.timestamp': 1 });
      return trafficData      
    } catch (error: any) {
        let err: string = (error).toString();
        return (err)
    }
};

export async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/trafficMetrics');
        console.log('Conexión exitosa a la base de datos');
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    }
}

async function addTrafficData(deviceId: string, newTrafficRecord: {}) {
    try {
        
        const result = await TrafficDataSchema.findOneAndUpdate(
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
async function addCompTrafficData(newTrafficRecord: {}) {
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

async function processTrafficData(category: object, date: Date) {
    for (const [group, device] of Object.entries(category)) {
        let mbpsChecked = device.mbps;
        if (typeof device.mbps == 'string') mbpsChecked = 0;
        const dataToInsert = {
            timestamp: date, 
            group: device.group,
            mbps: mbpsChecked
        };
        await addTrafficData(device.id, dataToInsert);
    }
}
export  async function submitToDB(detailedReport: TrafficReport, compiledTrafficReport: string) {
    
    const date = new Date();

    await processTrafficData(detailedReport.Proveedores, date);
    await processTrafficData(detailedReport.Transportes, date);
    await processTrafficData(detailedReport.BNG, date);
    await processTrafficData(detailedReport.FTTH, date);
    //Compiled report submit to DB
    const dataToInsert = {
        timestamp: date, 
        compiledReport: compiledTrafficReport
    }
    await addCompTrafficData(dataToInsert);  
}
