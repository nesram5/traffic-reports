import exp from "constants";

export interface iTrafficData {
    [key: string]: {
        ip: string;
        oid: string[];
        name: string;
        type: string;
        group: string;
        substract: string
    };
}
interface TrafficType {
    group: string;
    name: string;
    mbps: number | string;
    substract: string 
}
export interface iTrafficReport {
    [key: string]: TrafficType[];
}

export interface IMonthGroup {
    month: string;
    dayGroups: IDayGroup[];
}

export interface IDayGroup {
    day: string;
    groupItems: IGroupItem[];
}

export interface IGroupItem {
    hour: string;
    items: IItem[];
}

export interface IItem {
    first: string;
    second: string;
}