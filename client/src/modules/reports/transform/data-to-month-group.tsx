import { iTrafficReport, ITrafficReportProps } from "../interface/traffic-report";

import { IMonthGroup } from "../interface/date-group";
export const transformToMonthGroup = (trafficReport: ITrafficReportProps): IMonthGroup[] => {
    const result: IMonthGroup[] = [];

    trafficReport.data.forEach((report) => {
        report.data.forEach((entry) => {  // Iterate over the 'data' array in each report
            const date = new Date(entry.timestamp);
            const month = date.toLocaleString('default', { month: 'long' });
            const day = String(date.getDate()).padStart(2, '0');
            const hour = `${date.getHours().toString().padStart(2, '0')}:00`;

            // Buscar si ya existe el mes en el resultado
            let monthGroup = result.find((m) => m.month === month);
            if (!monthGroup) {
                monthGroup = { month, dayGroups: [] };
                result.push(monthGroup);
            }

            // Buscar si ya existe el día dentro del mes
            let dayGroup = monthGroup.dayGroups.find((d) => d.day === day);
            if (!dayGroup) {
                dayGroup = { day, groupItems: [] };
                monthGroup.dayGroups.push(dayGroup);
            }

            // Buscar si ya existe la hora dentro del día
            let groupItem = dayGroup.groupItems.find((g) => g.hour === hour);
            if (!groupItem) {
                groupItem = { hour, items: [] };
                dayGroup.groupItems.push(groupItem);
            }

            // Agregar el item al conjunto
            groupItem.items.push({
                first: entry.simpleReport,
                second: entry.detaildReport,
            });
        });
    });

    return  result;
};
