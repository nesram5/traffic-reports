import 'dotenv/config'
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { connectDB }  from './modules/handlerDB/connect';
import { fetchTrafficDataFromDB } from './modules/handlerDB/fetch';
import { scheduleExecution } from './modules/schedule/task';
import { router } from './modules/router/routes';
import { autoGetReport } from './modules/snmp-report/main';

const snmp_list_devices = path.join(__dirname, 'data/snmp_list_devices.json');
const zabbix_list_devices = path.join(__dirname, 'data/zabbix_list_devices.json');
const app = express();
const port: number = Number(process.env.PORT);
const server: string = String(process.env.SERVER);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

//Declaration of API's.
app.use('/', router);
app.use('/get-report', router);
app.use('/api/traffic', router);
app.post('/api/login', router);

// Start the server
app.listen(port, server, () => {
    
    if (!fs.existsSync(snmp_list_devices)) {
        console.error('File does not exist:', snmp_list_devices);
        return null; 
    }
    if (!fs.existsSync(zabbix_list_devices)) {
        console.error('File does not exist:', zabbix_list_devices);
        return null; 
    }
    //connectDB();
    console.log(`Server is running on ${server}`);  
    //autoGetReport();
    //fetchTrafficDataFromDB()
    //scheduleExecution();

})

