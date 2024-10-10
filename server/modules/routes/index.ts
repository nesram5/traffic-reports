import path from 'path';
import fs from 'fs';
import { getReport } from '../traffic-report/main';
import { User } from '../handlerDB/schema';
const cacheFile = path.join(__dirname, '../../cache/trafficDataCache.json');

export /*bundle*/ function routes(app) {
	

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build','index.html'));
  });


app.get('/api/traffic', async (req, res) => {    
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

app.get('/get-report', async (req, res) => {
    try {
        const resultMessage = await getReport();
        res.json({ message: resultMessage });
    } catch (error) {
        console.error('Error during SNMP scan:', error);
        res.status(500).json({ error: 'Error during SNMP scan.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in the database
      const user = await User.findOne({ username, password });
  
      if (user) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

}