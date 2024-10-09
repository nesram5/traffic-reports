import mongoose from 'mongoose';

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
export const CompTrafficData = mongoose.model('compiledtraffic', compiledTrafficDataSchema);