import { TrafficReport } from './interfaces';

export function detailed_report(detailedReport: TrafficReport, startTime: string): string {
    let banner = `\n\n\n\n------ _Reporte detallado_ -------\n`;
    let footer = `\n-------- _Estadísticas a la hora ${startTime}_ ---------`;
    let prov = `\n*Proveedores:*\n\n`;
    let totalProv = 0;
    let trans = `\n*Transportes:*\n\n`;
    let bng = `\n*BNG:*\n\n`;
    let ftths = `\n*FTTH:*\n\n`;

    for (const item of detailedReport.Proveedores) {
        const { name, id, mbps } = item;
        if (typeof mbps === 'string') {
            prov += `📌 *${name}:*  \`\`\`${mbps} Mbps\`\`\`\n`;
            continue;
        }
        prov += `📌 *${name}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
        totalProv = Number(mbps) + Number(totalProv);
    }
    prov += `📌 *Total Proveedores:*  \`\`\`${Math.round(totalProv)} Mbps\`\`\`\n`;

    // Reporte para Transportes
    for (const item of detailedReport.Transportes) {
        const { name, id, mbps } = item;
        if (typeof mbps === 'string') {
            trans += `📌 *${name}:*  \`\`\`${mbps} Mbps\`\`\`\n`;
            continue;
        }
        trans += `📌 *${name}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    // Reporte para BNG
    for (const item of detailedReport.BNG) {
        const { name, id, mbps } = item;
        if (typeof mbps === 'string') {
            bng += `📌 *${name}:*  \`\`\`${mbps} Mbps\`\`\`\n`;
            continue;
        }
        bng += `📌 *${name}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    // Reporte para FTTH
    for (const item of detailedReport.FTTH) {
        const { name, id, mbps } = item;
        if (typeof mbps === 'string') {
            ftths += `📌 *${name}:*  \`\`\`${mbps} Mbps\`\`\`\n`;
            continue;
        }
        ftths += `📌 *${name}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    // Combinando todo el reporte
    return `${banner}${prov}${trans}${bng}${ftths}${footer}`;
}

export function simplified_report(trafficReport: TrafficReport, startTime:string): string {

    let footer = `\n-------- _Estadísticas a la hora ${startTime}_ ---------`;
    let prov = `\n*Proveedores:*\n\n`;
    let totalProv = 0;
    let trans = `\n*Transportes:*\n\n`;
    let bng = `\n*BNG:*\n\n`;
    let ftths = `\n*FTTH:*\n\n`;
    let banner = `------ _Estado actual del trafico_ -------\n`
    
    //console.log(JSON.stringify(trafficReport));

    // Add Proveedores traffic results with no decimals
    for (const item of trafficReport.Proveedores) {
        const { group, id, mbps } = item;
        if (typeof mbps == 'string'){
            prov += `📌 *${group}:*  \`\`\`${mbps} Mbps\`\`\`\n`; 
            continue;
        }
        prov += `📌 *${group}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
        totalProv = Number(mbps) + Number(totalProv);
    }
    prov += `📌 *Total Proveedores:*  \`\`\`${Math.round(totalProv)} Mbps\`\`\`\n`;

    for (const item of trafficReport.Transportes) {
        const { group, id, mbps } = item;
        if (typeof mbps == 'string'){
            trans += `📌 *${group}:*  \`\`\`${mbps} Mbps\`\`\`\n`; 
            continue;
        }
        trans += `📌 *${group}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    for (const item of trafficReport.BNG) {
        const { group, id, mbps } = item;
        if (typeof mbps == 'string'){
            bng += `📌 *${group}:*  \`\`\`${mbps} Mbps\`\`\`\n`; 
            continue;
        }
        bng += `📌 *${group}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    for (const item of trafficReport.FTTH) {
        const { group, id, mbps } = item;
        if (typeof mbps == 'string'){
            ftths += `📌 *${group}:*  \`\`\`${mbps} Mbps\`\`\`\n`; 
            continue;
        }
        ftths += `📌 *${group}:*  \`\`\`${Math.round(mbps)} Mbps\`\`\`\n`;
    }

    return `${banner}${prov}${trans}${bng}${ftths}${footer}\n`;
}