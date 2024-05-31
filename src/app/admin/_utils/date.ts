import { parse, format, addYears } from 'date-fns';
// import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { toDate } from 'date-fns-tz'
export const isoStringFrom = (dateStr: string, timeStr: string) : string => {
    // '2024.12.4' '00:00'
    dateStr = dateStr.replace('0000', '2024')
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeStr || !timeRegex.test(timeStr)) {
        console.log('Invalid time format. Using default time.')
        timeStr = "00:00"
    }
    // const timeZone = 'Asia/Tokyo';    // console.log(`${dateStr} ${timeStr}`)
    const combinedStr = `${dateStr} ${timeStr}`;
    const datetimeRegex = /^(\d{4})[./-](\d{2})[./-](\d{2}) (\d{2}):(\d{2})$/ 
    // /^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/;
    const match = combinedStr.match(datetimeRegex);
    if (!match) {
        throw new Error(`Invalid date or time format ${combinedStr}`);
    }
    const [_, year, month, day, hours, minutes] = match;
    const formattedDateStr = `${year}-${month}-${day}T${hours}:${minutes}:00.000+09:00`;
    return formattedDateStr;
};