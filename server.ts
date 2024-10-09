import 'dotenv/config'
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { exec } from "child_process";
import { connectDB }  from './modules/handlerDB/connect';
import { fetchTrafficDataFromDB } from './modules/handlerDB/fetch';
import { scheduleExecution } from './modules/schedule/task';
import { router } from './modules/router/routes';

const list_devices = path.join(__dirname, './modules/traffic-report/data/list_devices.json');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

//Declaration of API's.
app.use('/', router);
app.use('/get-report', router);
app.use('/api/traffic', router);


// Start the server
app.listen(port, () => {
    
    if (!fs.existsSync(list_devices)) {
        console.error('File does not exist:', list_devices);
        return null; 
    }
    connectDB();
    console.log(`Server is running on ${process.env.SERVER}`);
    exec(`explorer ${process.env.SERVER}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
    });
    fetchTrafficDataFromDB()
    scheduleExecution();

})

