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


