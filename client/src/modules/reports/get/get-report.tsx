import React, { useState, useEffect } from 'react';
import { CodeBlock } from '../../copy-box/copy';

export const GetReport: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);
    const [simpleResult, setSimpleResult] = useState<string>('');
    const [detailedResult, setDetailedResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const handleStart = () => {
        setLoading(true);
        setSimpleResult('  Cargando el reporte... ');
        setDetailedResult('Por favor espere 30 sec');
        setProgress(0);

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
            }
        }, 30); // Update every 600 ms for a 60-second total duration

        fetch('/get-report-zabbix')
            .then(response => response.json())
            .then(data => {
                setProgress(100);
                setSimpleResult(data.message.simpleResult); 
                setDetailedResult(data.message.detailedResult); 
                setLoading(false);
            })
            .catch(error => {
                setProgress(50); 
                console.error('Error:', error);
                setSimpleResult('Error fetching data.');
                setDetailedResult('');
                setLoading(false);
            });
    };

    useEffect(() => {
        handleStart(); 
    }, []);

    return (
        <div>
           
            <div className="get-report">
                {/* Display the results in CodeBlock components */}
                <CodeBlock code={simpleResult} />
                <CodeBlock code={detailedResult} />
            </div>
            
            {/* Conditionally render the progress bar */}
            {progress < 100 && (
                <div className="progress">
                    <div className="progress-bar" 
                        style={{ width: `${progress}%` }}>
                    </div>
                </div>
            )}
        </div>
    );
};
