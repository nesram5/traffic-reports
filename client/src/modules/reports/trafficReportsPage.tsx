import React, { useState, useEffect } from 'react';
import { GetReport } from './getReport';

interface iTrafficReport {
    deviceId: string;
    data: {
        timestamp: string;
        simpleReport: string;
        detailedReport: string; // Corregido el nombre de la propiedad
    }[];
}

interface iTicketGroup {
    name: string;
    count: number;
    items?: iTicketGroup[];
}

// Main App component
export default function TrafficReportMainPage() {
    const [trafficData, setTrafficData] = useState<iTrafficReport[]>([]);
    const [groupedData, setGroupedData] = useState<iTicketGroup[]>([]);
    const [showGetReport, setShowGetReport] = useState(false); // State to control the visibility of GetReport

    // Fetch traffic data from the API
    useEffect(() => {
        async function fetchTrafficData() {
            try {
                const response = await fetch('/api/traffic');
                const data: iTrafficReport[] = await response.json();
                console.log(data);
                setTrafficData(data);
                groupTrafficData(data);
            } catch (error) {
                console.error('Error fetching traffic data:', error);
            }
        }

        fetchTrafficData();
    }, []);

    // Group traffic data by month, date, and hour
    const groupTrafficData = (data: iTrafficReport[]) => {
        const grouped: iTicketGroup[] = [];

        data.forEach(device => {
            device.data.forEach(report => {
                const date = new Date(report.timestamp);
                const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                const day = date.toLocaleString('default', { day: 'numeric', month: 'long' });

                // Get the hour and minute, ensuring two digits for both
                const hour = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0'); // Eliminado el restar 1

                // Combine hour and minutes
                const time = `${hour}:${minutes}`;

                // Find or create month group
                let monthGroup = grouped.find(g => g.name === month);
                if (!monthGroup) {
                    monthGroup = { name: month, count: 0, items: [] };
                    grouped.push(monthGroup);
                }
                monthGroup.count++;

                // Find or create day group
                let dayGroup = monthGroup.items?.find(g => g.name === day);
                if (!dayGroup) {
                    dayGroup = { name: day, count: 0, items: [] };
                    monthGroup.items?.push(dayGroup);
                }
                dayGroup.count++;

                // Add the report to the day group
                dayGroup.items?.push({
                    name: `${time}`,
                    count: 1,
                    items: [
                        { name: report.simpleReport, count: 1 },
                        { name: report.detailedReport, count: 2 }                 
                    ]
                });
                console.log(dayGroup);
            });
        });

        setGroupedData(grouped);
    };

    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
    const [copied, setCopied] = useState(false);

    // Toggle expand/collapse groups
    const toggleGroup = (groupName: string) => {
        setExpandedGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(groupName)) {
                newSet.delete(groupName);
            } else {
                newSet.add(groupName);
            }
            return newSet;
        });
    };

    // Function to copy the content to the clipboard
    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
        });
    };

    // Render group function
    const renderGroup = (group: iTicketGroup, level: number = 0) => {
        const isExpanded = expandedGroups.has(group.name);
        const hasItems = group.items && group.items.length > 0;

        // Extract the content to copy (e.g., the name of items or other content you want)
        const copyContent = group.items?.map(item => item.name).join('\n') || '';

        return (
            <div key={group.name} style={{ marginLeft: `${level * 20}px` }}>
                <div
                    className={`group-header ${hasItems ? 'expandable' : ''}`}
                    onClick={() => hasItems && toggleGroup(group.name)}
                >
                    {hasItems && (
                        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                    )}
                    <span className="group-name">{group.name}</span>
                    <span className="group-count"> ({group.count})</span>
                </div>

                {isExpanded && group.items && (
                    <div className="group-items">
                        {/* Render nested groups */}
                        {group.items.map((item) => (
                            <div key={item.name}>
                                {renderGroup(item, level + 1)}
                            </div>
                        ))}

                        {/* Add a copy button */}
                        <button className="copy-btn" onClick={() => copyToClipboard(copyContent)}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            {showGetReport && <GetReport />}
            <div className="container">
                <div className="main-content">
                    <h1>Reportes de tráfico por hora</h1>
                    {groupedData.length > 0 ? (
                        groupedData.map((group) => renderGroup(group))
                    ) : (
                        <p>Loading traffic data...</p>
                    )}
                </div>

                <div className="sidebar">
                    <h3>¿Generar un reporte en este momento?</h3>
                    <button onClick={() => setShowGetReport(true)}>
                        Generar ahora
                    </button>
                </div>
            </div>
        </div>
    );
}
