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
    const formattedDate = format(date, "M/dd (EEE)", { locale: ja });
    return formattedDate;
}
export function timeStringFrom(dateString: string): string {
    const timeZone = 'Asia/Tokyo';
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, timeZone);
    const formattedTime = format(zonedDate, 'HH:mm');
    return formattedTime;
}
