import React, { useState } from 'react';
import { IDateGroupProps, IMonthGroup, IDayGroup } from '../interface/date-group';

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
};

const RecursiveDayGroup: React.FC<{ dayGroup: IDayGroup }> = ({ dayGroup }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="group-header">
            <div onClick={toggleExpand} style={{ cursor: 'pointer', marginLeft: '35px' }}>
                {dayGroup.day}
            </div>
            {isExpanded &&
                dayGroup.groupItems.map((groupItem, hourIdx) => (
                    <div className="group-name" key={hourIdx} style={{ marginLeft: '30px' }}>
                        <div>{groupItem.hour}</div>
                        {groupItem.items.map((item, itemIdx) => (
                            <div key={itemIdx} style={{ marginLeft: '45px' }}>
                                <div className="group-items">{item.first}</div>
                                <button
                                    className="copy-btn"
                                    onClick={() => copyToClipboard(item.first)}
                                >
                                    Copy
                                </button>
                                <div className="group-items">{item.second}</div>
                                <button
                                    className="copy-btn"
                                    onClick={() => copyToClipboard(item.second)}
                                >
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

const RecursiveMonthGroup: React.FC<{ group: IMonthGroup }> = ({ group }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="group-header">
            <div onClick={toggleExpand} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {group.month}
            </div>
            {isExpanded &&
                group.dayGroups.map((dayGroup, dayIdx) => (
                    <RecursiveDayGroup key={dayIdx} dayGroup={dayGroup} />
                ))}
        </div>
    );
};

export const DropDownList: React.FC<IDateGroupProps> = ({ data }) => {
    return (
        <div>
            {data.map((group: IMonthGroup, index) => (
                <div key={index}>
                    <h2>{group.month}</h2>
                    <RecursiveMonthGroup key={index} group={group} />
                </div>
            ))}
        </div>
    );
};

export default DropDownList;
