import React, { useState, useEffect } from 'react';

export const GetReport: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);
    const [result, setResult] = useState<string>('Results will appear here...');
    const [loading, setLoading] = useState<boolean>(false);

    // Function to start fetching the report and updating the progress bar
    const handleStart = () => {
        setLoading(true);
        setResult('Cargando el reporte por favor espere 1 min');
        setProgress(0);

        // Simulate progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
            }
        }, 600); // Update every 600 ms for a 60-second total duration

        // Fetch the report data (mocked API call)
        fetch('/get-report')
            .then(response => response.json())
            .then(data => {
                setProgress(100); // Ensure the progress bar is full
                setResult(data.message);
                setLoading(false);
            })
            .catch(error => {
                setProgress(50); // Partial progress in case of error
                console.error('Error:', error);
                setResult('Error fetching SNMP data.');
                setLoading(false);
            });
    };

    // UseEffect hook to run handleStart when the component is first displayed
    useEffect(() => {
        handleStart(); // Automatically start when the component mounts
    }, []);

    return (
        <div className="container-top">
            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
                         
            <pre className="result">{result}</pre>
        </div>
    );
};
