import fs from 'fs';
import path from 'path';
import snmp from 'snmp-native';
import { iTrafficData } from '../interfaces/iTrafficData';


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

async function get(target: string, oids: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let timeout = [1000];
        let community_name = process.env.COMUNNITY;
        const session = new snmp.Session();
        session.get({ oid: oids, host: target, timeouts: timeout, community: community_name }, (error, varbinds) => {
            session.close();
            if (error) {
                reject(error);
            } else {
                resolve(varbinds[0].value);
            }
        });
    });
}

export async function getAll(data: iTrafficData, sampleData: Array<Record<string, any>>) {
    for (let i = 0; i < 4; i++) {
        for (const device of Object.values(data)) {
            try {
                const sample = await get(device.ip, device.oid);
                sampleData[i][device.name] = sample;
            } catch (error) {
                console.log(error);
                sampleData[i][device.name] = false;
            }
        }
        if (i < 3) {
            await new Promise(resolve => setTimeout(resolve, 20000));
        }
    }
}




