import { parse, format, addYears } from 'date-fns';

export const datetimeFrom = (dateStr, timeStr) => {
    console.log('timestampFrom', dateStr, timeStr);

    if (timeStr =='invalid time') {
        timeStr = "00:00"
    }
    
    dateStr = dateStr.replace('0000', '2024');

    const parsedDate = parse(dateStr, 'yyyy.MM.dd', new Date());

    let [hours, minutes] = [0, 0];
    if (timeStr) {
        try {
            [hours, minutes] = timeStr.split(':').map(Number);
        } catch (e) {
            console.log("Error parsing timeStr", e, timeStr);
        }
    }
    const combinedDate = new Date(parsedDate);
    combinedDate.setHours(hours, minutes);

    const isoString = format(combinedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

    console.log('combinedDate2', dateStr, timeStr, combinedDate);
    return isoString;
};