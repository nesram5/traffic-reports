export interface iTrafficData {
    [key: string]: {
        ip: string;
        oid: string;
        name: string;
        type: string;
        group: string;
        substract: boolean
    };
}
interface TrafficType {
    group: string;
    name: string;
    mbps: number | string;
    substract: boolean 
}
export interface iTrafficReport {
    [key: string]: TrafficType[];
}


