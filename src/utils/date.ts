// import dayjs, { Dayjs } from "dayjs";
import { isSameDay, differenceInCalendarDays } from 'date-fns';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
// import { toZonedTime, fromZonedTime, toDate } from "date-fns-tz";
import { formatInTimeZone } from 'date-fns-tz'
// import { parse, format, addYears } from 'date-fns';
// export function getTenseOfDate(date: Date, now: Date, unit: 'day'): string {
//     // console.log("[getTenseOfDate] date, now", date, now, differenceInCalendarDays(date, now))
//     if (isSameDay(date, now)) {
//         return 'today';
//     } else if (differenceInCalendarDays(date, now) < 0) {
//         return 'past';
//     } else {
//         return 'future';
//     }
// }
const timeZone_tokyo = 'Asia/Tokyo';

export function localedDateStringFrom(isoString: string, {timeZone}: { timeZone: string } = { timeZone: timeZone_tokyo }): string {
    // const date = parseISO(ISOString);
    try {
        const formattedDate = formatInTimeZone(isoString, timeZone, "M/d (EEE)", { locale: ja });
        return formattedDate;
    }
    catch (error) {
        console.error('[localedDateStringFrom]', isoString, error);
        throw Error(`[localedDateStringFrom] ${isoString} ${error}`);
    }
}
export function dateStringFrom(isoString: string, {timeZone}: { timeZone: string } = { timeZone: timeZone_tokyo }): string {
    const formattedDate = formatInTimeZone(isoString, timeZone, "yyyy-MM-dd");
    return formattedDate;
}
// export function isoString
export function timeStringFrom(isoString: string, {timeZone}: { timeZone: string } = { timeZone: timeZone_tokyo }): string {
    const formattedTime = formatInTimeZone(isoString, timeZone, 'HH:mm', { locale: ja })
    return formattedTime;
}

export const isoStringFromStrings = (dateStr: string, timeStr: string, offsetStr: string = '+09:00') : string => {
    // '2024.12.4' '00:00'
    dateStr = dateStr.replace('0000', '2024')
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeStr || !timeRegex.test(timeStr)) {
        console.log('Invalid time format. Using default time.')
        timeStr = "00:00"
    }
    // const timeZone = 'Asia/Tokyo';    // console.log(`${dateStr} ${timeStr}`)
    const combinedStr = `${dateStr} ${timeStr}`;
    const datetimeRegex = /^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/;
    const match = combinedStr.match(datetimeRegex);
    if (!match) {
        throw new Error('Invalid date or time format');
    }
    const [_, year, month, day, hours, minutes] = match;
    const formattedDateStr = `${year}-${month}-${day}T${hours}:${minutes}:00.000${offsetStr}`;
    return formattedDateStr;
};

export const isoStringFromDate = (date: Date): string => {
    const formattedDateStr = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    return formattedDateStr;
}
// export const localeDateStringFromDate = (date: Date): string => {
//     const formattedDateStr = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
//     return formattedDateStr;
// }
