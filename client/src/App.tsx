import React, { useState, useEffect } from 'react';
import './App.css';
import CodeBlock from './modules/codeBlock';

interface TrafficReport {
    deviceId: string;
    data: {
        timestamp: string;
        compiledReport: string;
    }[];
}

interface TicketGroup {
  name: string | React.ReactNode; // Permitir tanto string como JSX
  count: number;
  items?: TicketGroup[];
}

// Main App component
export default function App() {
    const [trafficData, setTrafficData] = useState<TrafficReport[]>([]);
    const [groupedData, setGroupedData] = useState<TicketGroup[]>([]);

    // Fetch traffic data from the API
    useEffect(() => {
        async function fetchTrafficData() {
            try {
                const response = await fetch('http://localhost:3001/api/traffic');
                const data: TrafficReport[] = await response.json();
                setTrafficData(data);
                groupTrafficData(data);
            } catch (error) {
                console.error('Error fetching traffic data:', error);
            }
        }

        fetchTrafficData();
    }, []);

    // Group traffic data by month, date, and hour
    const groupTrafficData = (data: TrafficReport[]) => {
        const grouped: TicketGroup[] = [];

        data.forEach(device => {
            device.data.forEach(report => {
                const date = new Date(report.timestamp);
                const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                const day = date.toLocaleString('default', { day: 'numeric', month: 'long' });                
                const hour = String(date.getHours()).padStart(2, '0');
                const minutes = String((date.getMinutes()) - 1).padStart(2, '0');                
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

                // Add the report to the day group with <CodeBox />
                dayGroup.items?.push({
                    name: `${time}`,
                    count: 1, // You could count the reports here or show additional info
                    items: [
                        {
                            name: <CodeBlock code={report.compiledReport} />, // Display the report in a CodeBox
                            count: 1
                        }
                    ]
                });
            });
        });

        setGroupedData(grouped);
    };

    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

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

    const renderGroup = (group: TicketGroup, level: number = 0) => {
        const isExpanded = expandedGroups.has(group.name);
        const hasItems = group.items && group.items.length > 0;

        const firstItem = hasItems ? group.items![0] : null;
        const lastItem = hasItems ? group.items![group.items!.length - 1] : null;
        const middleItems = hasItems ? group.items!.slice(1, group.items!.length - 1) : [];

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
                    <span className="group-count">({group.count})</span>
                </div>
                {isExpanded && group.items && (
                    <div className="group-items">
                        {firstItem && renderGroup(firstItem, level + 1)}
                        {middleItems.length > 0 && middleItems.map((item, index) => (
                            <div key={index}>
                                {renderGroup(item, level + 1)}
                            </div>
                        ))}
                        {lastItem && renderGroup(lastItem, level + 1)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>Reportes de tráfico por hora</h1>
            {groupedData.length > 0 ? (
                groupedData.map((group) => renderGroup(group))
            ) : (
                <p>Loading traffic data...</p>
            )}
        </div>
    );
}
