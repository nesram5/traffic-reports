import 'dotenv/config'
import express from 'express';
import { WebSocketServer } from 'ws';
import https from 'https';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { connectDB }  from './modules/handlerDB/connect';
import { fetchTrafficDataFromDB } from './modules/handlerDB/fetch';
import { scheduleExecution } from './modules/schedule/task';
import { router } from './modules/router/routes';


const snmp_list_devices = path.join(__dirname, 'data/snmp_list_devices.json');
const zabbix_list_devices = path.join(__dirname, 'data/zabbix_list_devices.json');
const app = express();
const port: number = Number(process.env.PORT);
const address: string = String(process.env.SERVER);

const options = {
    key: fs.readFileSync(path.join(__dirname, "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert.pem"))
};
const server = https.createServer(options, app);
const wss = new WebSocketServer({ noServer: true });

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

//Declaration of API's.
app.use('/', router);
app.use('/get-report-zabbix', router);
app.use('/get-report-snmp', router);
app.use('/api/traffic', router);
app.post('/api/login', router);
// WebSocket server for real-time updates

function getTrafficData() {
    const data = fs.readFileSync(path.join(__dirname, 'cache/trafficDataCache.json'), 'utf-8');
    return JSON.parse(data);
}



wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Send initial data on new connection
    ws.send(JSON.stringify(getTrafficData()));

    // Simulate data updates and broadcast every minute
    setInterval(() => {
        const updatedData = getTrafficData();
        ws.send(JSON.stringify(updatedData));
    }, 30000); // 60000ms = 1 minute
})


// Start the server
server.listen(port, address, () => {
    
    if (!fs.existsSync(snmp_list_devices)) {
        console.error('File does not exist:', snmp_list_devices);
        return null; 
    }
    if (!fs.existsSync(zabbix_list_devices)) {
        console.error('File does not exist:', zabbix_list_devices);
        return null; 
    }
    connectDB();
    console.log(`Server is running on ${address}`);  
    fetchTrafficDataFromDB()
    scheduleExecution();

})

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
