// import dayjs, { Dayjs } from "dayjs";
import { isSameDay, differenceInCalendarDays } from 'date-fns';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { toZonedTime, fromZonedTime, toDate } from "date-fns-tz";

export function getTenseOfDate(date: Date, now: Date, unit: 'day'): string {
    // console.log("[getTenseOfDate] date, now", date, now, differenceInCalendarDays(date, now))
    if (isSameDay(date, now)) {
        return 'Today';
    } else if (differenceInCalendarDays(date, now) < 0) {
        return 'Past';
    } else {
        return 'Future';
    }
}

export function dateStringFrom(dateString: string): string {
    const date = parseISO(dateString);
    console.log("[formatDate] - ", dateString, date)
    const formattedDate = format(date, "PPP (EEE)", { locale: ja });
    return formattedDate;
}
// import custom from "dayjs"
// import dayjs,  from 'dayjs-ext'
// import customParseFormat from 'dayjs-ext/plugin/customParseFormat'
// import
// import customParseFormat from 'dayjs'
// export function dateStringFrom(dateString: string): string {
//     const date = new Date(dateString);
//     console.log("[formatDate] - ", dateString, date)
//     const options: Intl.DateTimeFormatOptions = {   
//         month: 'long', 
//         day: 'numeric',
//         weekday: 'short', 
//         timeZone: "Asia/Tokyo"
//     };
//     return date.toLocaleDateString("ja-JP", options);
// }
// export function timeStringFrom(dateString: string): string {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = { 
//         hour: 'numeric', 
//         minute: 'numeric', 
//         hour12: false, 
//         timeZone: "Asia/Tokyo"
//     };
//     return date.toLocaleTimeString("ja-JP", options);
// }
export function timeStringFrom(dateString: string): string {
    const timeZone = 'Asia/Tokyo';
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, timeZone);
    const formattedTime = format(zonedDate, 'HH:mm');
    return formattedTime;
}

// 사용 예시:
console.log(timeStringFrom('2024-05-24T15:36:22Z'));