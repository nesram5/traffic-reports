import snmp from 'snmp-native';


async function main () {
    try {
        let result:any = [];
        let result2:any = [];
        // First SNMP data fetch
        result = await getData(result);
        console.log("First pass:", result);

        // Wait for 30 seconds (30000 milliseconds)
        await wait(30000);

        // Second SNMP data fetch
        result2 = await getData(result2);
        console.log("Second pass:", result2);
        
        // Calculate Mbps
        let mbps = convertToMbps(result , result2 );
        
       //convertToMbps('963925278670008', '963925278670008');
        //convertToMbps('963956557026477' , '963987574239748' );
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Fetch SNMP data
function getData(result: any) {
    return new Promise((resolve, reject) => {
        const options = {
            port: 161,
            host: '10.0.0.17',
            community: 'NETCOM',
            timeouts: [1000],
            version: 1   
        };

        const session = new snmp.Session(options);
        const oids = [ [1,3,6,1,2,1,31,1,1,1,10,19]];

        session.getAll({ oids: oids }, function (error, varbinds) {
            session.close();
            if (error) {
                reject(error);  // Reject the promise on error
            } else {
                result = []; // Clear result before pushing new data
                varbinds.forEach(function (vb) {
                    console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
                    result.push(vb.value);
                });
                resolve(result);  // Resolve when data fetching is complete
            }
        });
    });
}

// Convert counters to Mbps
function convertToMbps(firstPass: any, secondPass: any) {
    try {
        const counter1 = BigInt(firstPass);
        const counter2 = BigInt(secondPass);
        const deltaCounter = counter2 - counter1;
        const deltaBits = deltaCounter * 8n;
        const mbps = deltaBits / 30n / 1000000n; // Divide by 30 for 30-second interval
        console.log("Mbps:", Number(mbps));
        return mbps;
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

// Helper function to wait for a given time
function wait(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();
