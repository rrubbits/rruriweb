// datetimeFrom.test.js
import { datetimeFrom } from './date';
import { format } from 'date-fns';

describe('datetimeFrom', () => {
    const timeZone = 'Asia/Tokyo';
    test('should correctly combine date and time strings', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = datetimeFrom(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle missing year and time string gracefully', () => {
        const dateStr = '0000.05.26';
        const result = datetimeFrom(dateStr);
        // const expectedLocalString = datetimeFrom('2024.05.26', '00:00')
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle invalid time string gracefully', () => {
        const dateStr = '0000.05.26';
        const timeStr = 'invalid time';
        const result = datetimeFrom(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(datetimeFrom('2024.05.26', '00:00'));
    });

    test('should handle date string without year correctly', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = datetimeFrom(dateStr, timeStr);
        // const expectedDate = new Date(2024, 4, 26, 13, 45);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });
});