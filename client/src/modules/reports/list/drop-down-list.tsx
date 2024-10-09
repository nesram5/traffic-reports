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
                <div className="expandable">
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
                <div className="expandable">
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
                        <div key={index} className='expandable'>
                            <CodeBlock code={item.first.toString()} />
                            <div></div>
                            <CodeBlock code={item.second.toString()} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Main component that renders the whole structure
export const TrafficReportDropDown: React.FC = () => {
   

    const [monthData, setMonthData] = useState<IMonthGroup[]>([]);

    // Fetch traffic data from the API
    useEffect(() => {
        async function fetchTrafficData() {
            try {
                const response = await fetch('/api/traffic');
                setMonthData(await response.json());
            } catch (error) {
                console.error('Error fetching traffic data:', error);
            }
        }

        fetchTrafficData();
    }, []);

    return (
        <div>
                {monthData.map((monthGroup, index) => (
                    <MonthGroup key={index} month={monthGroup.month} dayGroups={monthGroup.dayGroups} />
                ))}
       </div>
    );
};