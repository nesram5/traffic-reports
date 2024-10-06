import fs from 'fs';
import path from 'path';
import snmp from 'snmp-native';
import { iTrafficData } from '../interfaces/i-traffic-data';


export function readDeviceList(): iTrafficData | string {
    const filePath = path.join(__dirname, '../data/list_devices.json');

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        
        try {
            return JSON.parse(data) as iTrafficData;
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            let err = "Can't access to the traffic_data file"
            return err; 
        }

    } catch (fileError) {
        console.error('Error reading file:', fileError);
        let err = "Can't access to the traffic_data file"
        return err; 
    }
}


async function get(oids: string[], target: string) {
    return new Promise((resolve, reject) => {
        let result:any = [];
        let community_name = process.env.COMUNNITY;
        const options = {
            port: 161,
            host: target,
            community: community_name,
            timeouts: [1000, 1000, 1000],
            version: 1   
        };

        const session = new snmp.Session(options);
        session.getAll({ oids: oids }, function (error, varbinds) {
            session.close();
            if (error) {
                reject(error);  
            } else {
                result = []; 
                varbinds.forEach(function (vb) {                    
                    result.push(vb.value);
                });
                resolve(result); 
            }
        });
    });
}

export async function getAll(data: iTrafficData, sampleData: Array<Record<string, any>>) {
    for (let i = 0; i < 10; i++) {
        for (const device of Object.values(data)) {
            try {
                               
                const sample = await get(device.oid, device.ip);                
                sampleData[i][device.name] = sample;
            } catch (error) {
                console.log(error);
                sampleData[i][device.name] = false;
            }
        }
        if (i < 9) {
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    }
}
