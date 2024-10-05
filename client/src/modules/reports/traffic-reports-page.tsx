import React, { useState, useEffect } from 'react';
import { GetReport } from './get/get-report';
import { iTrafficReport } from './interface/traffic-report';
import { IMonthGroup } from './interface/date-group';
import { transformToMonthGroup } from './transform/data-to-month-group';
import { DropDownList } from './list/drop-down-list';

// Main App component
export const TrafficReportMainPage: React.FC = () => {
    const [showGetReport, setShowGetReport] = useState(false); // State to control the visibility of GetReport
    const [dateGroupData, setDateGroupData] = useState<IMonthGroup[]>([]); // State to hold the transformed data

    // Fetch traffic data from the API
    useEffect(() => {
        async function fetchTrafficData() {
            try {
                const response = await fetch('/api/traffic');
                const data: iTrafficReport[] = await response.json();

                // Use the transform function and update the state
                const transformedData: IMonthGroup[] = transformToMonthGroup({ data });
                setDateGroupData(transformedData);

            } catch (error) {
                console.error('Error fetching traffic data:', error);
            }
        }
        console.log(JSON.stringify(dateGroupData));
        fetchTrafficData();
    }, []);

    return (
        <div>
            {showGetReport && <GetReport />}
            <div className="container">
                <div className="main-content">
                    <h1>Reportes de tráfico por hora</h1>
                <DropDownList data={dateGroupData} />
                </div>
            </div>
            <div className="sidebar">
                <h3>¿Generar un reporte en este momento?</h3>
                <button onClick={() => setShowGetReport(true)}>
                    Generar ahora
                </button>
            </div>
        </div>
    );
};
