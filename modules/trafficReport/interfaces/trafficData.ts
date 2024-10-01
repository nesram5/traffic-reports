export interface TrafficData {
    [key: string]: {
        ip: string;
        oid: string;
        name: string;
        type: string;
        group: string;
        key: string
    };
}


export interface TrafficReport {
    Proveedores: { group: string, name: string, id: string, mbps : number | string }[];
    Transportes: { group: string, name: string, id: string, mbps : number | string }[];
    BNG: { group: string, name: string, id: string, mbps : number | string }[];
    FTTH: { group: string, name: string, id: string, mbps : number | string }[];
}