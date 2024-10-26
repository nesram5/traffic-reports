import React, { useState, useEffect } from 'react';
import { CodeBlock } from '../../copy-box/copy';
// Data interfaces
interface IItem {
    first: string;
    second: string;
}

interface IGroupItem {
    hour: string;
    items: IItem[];
}

interface IDayGroup {
    day: string;
    groupItems: IGroupItem[];
}
interface IMonthGroup {
    month: string;
    dayGroups: IDayGroup[];
}

// MonthGroup component (top level)
const MonthGroup: React.FC<{ month: string, dayGroups: IDayGroup[] }> = ({ month, dayGroups }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='container-list'>
            <div className="group-fold" onClick={toggleExpand} style={{ fontWeight: 'bold' }}>
                {month}
            </div>
            {isExpanded && (
                <div className="expandable-group">
                    {dayGroups.map((dayGroup, index) => (
                        <DayGroup key={index} day={dayGroup.day} groupItems={dayGroup.groupItems} />
                    ))}
                </div>
            )}
        </div>
    );
};

// DayGroup component (second level)
const DayGroup: React.FC<{ day: string, groupItems: IGroupItem[] }> = ({ day, groupItems }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='container-list'>
            <div className="group-fold"  onClick={toggleExpand}>
                {day}
            </div>
            {isExpanded && (
                <div className="expandable-group">
                    {groupItems.map((groupItem, index) => (
                        <GroupItem key={index} hour={groupItem.hour} items={groupItem.items} />
                    ))}
                </div>
            )}
        </div>
    );
};

// GroupItem component (third level)
const GroupItem: React.FC<{ hour: string, items: IItem[] }> = ({ hour, items }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='container-list'>
            <div className="group-fold" onClick={toggleExpand}>
                {hour}
            </div>
            {isExpanded && (
                <div>
                    {items.map((item, index) => (
                        <section key={index} className='expandable-item'>
                            <div className='get-report' >
                            <CodeBlock code={item.first.toString()} />
                            <CodeBlock code={item.second.toString()} />
                            </div>
                            <button className='fold-button' onClick={toggleExpand}>⬇️</button>
                        </section>                        
                    ))}
                </div>
            )}
        </div>
    );
};

// Main component that renders the whole structure
export const TrafficReportDropDown: React.FC = () => {
    const [monthData, setMonthData] = useState<IMonthGroup[]>([]);

    useEffect(() => {
        // Fetch initial data from /api/traffic
        async function fetchInitialData() {
            try {
                const response = await fetch('/api/traffic');
                setMonthData(await response.json());
            } catch (error) {
                console.error('Error fetching initial traffic data:', error);
            }
        }

        fetchInitialData();
        
        // Establish a WebSocket connection for real-time updates
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const socket = new WebSocket(`${protocol}://10.3.0.194/api/traffic-updates`);

        socket.onmessage = (event) => {
            const updatedData: IMonthGroup[] = JSON.parse(event.data);
            setMonthData(updatedData);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            {monthData.map((monthGroup, index) => (
                <MonthGroup key={index} month={monthGroup.month} dayGroups={monthGroup.dayGroups} />
            ))}
        </div>
    );
};