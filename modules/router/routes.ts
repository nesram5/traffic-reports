import express from 'express';
import path from 'path';
import fs from 'fs';
import { getReport } from '../traffic-report/main';

const cacheFile = path.join(__dirname, '../../cache/trafficDataCache.json');
export const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build','index.html'));
  });


router.get('/api/traffic', async (req, res) => {    
    fs.readFile(cacheFile, 'utf8', (err, data) => {
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

router.get('/get-report', async (req, res) => {
    try {
        const resultMessage = await getReport();
        res.json({ message: resultMessage });
    } catch (error) {
        console.error('Error during SNMP scan:', error);
        res.status(500).json({ error: 'Error during SNMP scan.' });
    }
});