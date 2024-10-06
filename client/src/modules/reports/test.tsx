import React, { useState } from 'react';
import { CodeBlock } from './copy-box/copy';

// Data interfaces
interface Item {
    first: string;
    second: string;
}

interface GroupItem {
    hour: string;
    items: Item[];
}

interface DayGroup {
    day: string;
    groupItems: GroupItem[];
}

// MonthGroup component (top level)
const MonthGroup: React.FC<{ month: string, dayGroups: DayGroup[] }> = ({ month, dayGroups }) => {
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
const DayGroup: React.FC<{ day: string, groupItems: GroupItem[] }> = ({ day, groupItems }) => {
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
const GroupItem: React.FC<{ hour: string, items: Item[] }> = ({ hour, items }) => {
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
    const monthData = [
        {
            month: 'octubre',
            dayGroups: [
                {
                    day: '03',
                    groupItems: [
                        {
                            hour: '00:00',
                            items: [
                                { first: 'hello 1', second: 'hello 2' },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div>
                {monthData.map((monthGroup, index) => (
                    <MonthGroup key={index} month={monthGroup.month} dayGroups={monthGroup.dayGroups} />
                ))}
       </div>
    );
};