import 'dotenv/config'
import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/trafficMetrics');
        console.log('Successful connection to the database');
    }
     catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
}
