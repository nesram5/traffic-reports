const fs = require('fs');

// Lee el archivo de entrada
const inputFilePath = './traffic_data.json';
const outputFilePath = './output.json';

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Parsea el contenido del archivo JSON
    const inputData = JSON.parse(data);

    // Convierte el formato
    const outputData = [];

    for (const key in inputData) {
        const device = inputData[key];
        const deviceId = device.key;

        // Crea un objeto con el nuevo formato
        const deviceData = {
            deviceId: deviceId,
            data: [
                {
                    timestamp: "2024-09-30T12:00:00Z",
                    group: device.group,
                    mbps: 0
                },
                {
                    timestamp: "2024-09-30T13:00:00Z",
                    group: device.group,
                    mbps: 0
                }
            ]
        };

        outputData.push(deviceData);
    }

    // Escribe el nuevo archivo JSON
    fs.writeFile(outputFilePath, JSON.stringify(outputData, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir el archivo de salida:', err);
            return;
        }
        console.log('Archivo output.json creado con éxito.');
    });
});