import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
const cacheFile = path.join(__dirname, '../../cache/trafficDataCache.json');

// Function to fetch the latest data from MongoDB and write to the cache file
const compiledTrafficDataSchema = new mongoose.Schema({
        deviceId: { type: String, required: true }, 
        data: [
            {
                timestamp: { type: Date, required: true }, 
                simpleReport: { type: String, required: true },
                detaildReport: { type: String, required: true }                
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
        fs.writeFileSync(cacheFile, JSON.stringify(trafficData, null, 2));
        console.log('Traffic data cache file updated');
    } catch (err) {
        console.error('Error fetching traffic data:', err);
    }
}

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Successful connection to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
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
            name: device.name,
            group: device.group,
            mbps: mbpsChecked
        };
        await pushLooseTrafficData(device.id, dataToInsert);
    }
}
export  async function submitToDB(simpleResult: string, detailedResult: string) {
    
    const date = new Date();
    
    const dataToInsert = {
        timestamp: date, 
        simpleReport: simpleResult,
        detaildReport: detailedResult

    }
    await pushCompiledReport(dataToInsert);  
}
