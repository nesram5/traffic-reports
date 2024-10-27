import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import https from 'https';
import http from 'http';
import { connectDB } from './modules/handlerDB/connect';
import { fetchTrafficDataFromDB } from './modules/handlerDB/fetch';
import { scheduleExecution } from './modules/schedule/task';
import { router } from './modules/router/routes';

const snmp_list_devices = path.join(__dirname, 'data/snmp_list_devices.json');
const zabbix_list_devices = path.join(__dirname, 'data/zabbix_list_devices.json');
const app = express();
const port: number = Number(process.env.PORT) || 443;
const httpPort: number = 80;
const address: string = process.env.SERVER || 'localhost';

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

// Declaration of APIs
app.use('/', router);
app.use('/get-report-zabbix', router);
app.use('/get-report-snmp', router);
app.use('/api/traffic', router);
app.post('/api/login', router);

// Function to fetch WebSocket data
function getTrafficData() {
    const data = fs.readFileSync(path.join(__dirname, 'cache/trafficDataCache.json'), 'utf-8');
    return JSON.parse(data);
}

// Start HTTPS server
const httpsServer = https.createServer(options, app);

// WebSocket server associated with HTTPS server
const wss = new WebSocketServer({ server: httpsServer });
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Send initial data on new connection
    ws.send(JSON.stringify(getTrafficData()));

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Broadcast updates to all clients every 1 minute
setInterval(() => {
    fetchTrafficDataFromDB()
    const updatedData = getTrafficData();
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(updatedData));
        }
    });
}, 60000);

// Start HTTPS server
httpsServer.listen(port, address, () => {
    if (!fs.existsSync(snmp_list_devices)) {
        console.error('File does not exist:', snmp_list_devices);
        return null;
    }
    if (!fs.existsSync(zabbix_list_devices)) {
        console.error('File does not exist:', zabbix_list_devices);
        return null;
    }
    connectDB();
    console.log(`HTTPS server is running on https://${address}:${port}`);
    fetchTrafficDataFromDB();
    scheduleExecution();
});

// Start HTTP server to redirect to HTTPS
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${address}:${port}${req.url}` });
    res.end();
});

httpServer.listen(httpPort, () => {
    console.log(`HTTP server is running on http://${address}:${httpPort} and redirecting to HTTPS`);
});
