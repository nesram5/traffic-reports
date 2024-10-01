import express from 'express';
import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import { getReport, autoGetReport } from './modules/trafficReport/main';  
import mongoose from 'mongoose';
import cors from 'cors';
import { fetchTrafficDataFromDatabase }  from './modules/database/handler';
import 'dotenv/config'

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
// Path to cache file
export const CACHE_FILE_PATH = path.join(__dirname, './cache/trafficDataCache.json');

app.get('/api/traffic', async (req, res) => {    
    fs.readFile(CACHE_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading cache file', error: err });
        }
        try {
            const trafficData = JSON.parse(data);
            res.json(trafficData);
        } catch (parseErr) {
            res.status(500).json({ message: 'Error parsing cache file', error: parseErr });
        }
    });
  });

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build','index.html'));
  });

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'history.html'));
});


app.get('/get-report', async (req, res) => {
    try {
        const resultMessage = await getReport();
        res.json({ message: resultMessage });
    } catch (error) {
        console.error('Error during SNMP scan:', error);
        res.status(500).json({ error: 'Error during SNMP scan.' });
    }
});

//Automatic execute functions
async function executeEvery30Min() {
    await autoGetReport();
    fetchTrafficDataFromDatabase();
    console.log("Function executed at:", new Date());
}
  
function getTimeUntilNextExecution() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();    
    const minutesRemaining = 30 - (minutes % 30);
    
    // Calculate the time in milliseconds until the next execution
    return (minutesRemaining * 60 * 1000) - (seconds * 1000 + milliseconds);
  }
  
function scheduleExecution() {
    const timeUntilNextExecution = getTimeUntilNextExecution();
    
    setTimeout(() => {
      executeEvery30Min();
      setInterval(executeEvery30Min, 30 * 60 * 1000); 
    }, timeUntilNextExecution);
}

app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
  });
// Start the server

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(port, () => {
            const filePath = path.join(__dirname, './modules/trafficReport/data/list_devices.json');
            if (!fs.existsSync(filePath)) {
                console.error('File does not exist:', filePath);
                return null; 
            }
            console.log(`Server is running on http://localhost:${port}`);
            exec(`explorer "http://localhost:${port}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
            });
            fetchTrafficDataFromDatabase();
            scheduleExecution();
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

