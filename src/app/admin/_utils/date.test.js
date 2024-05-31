// date.test.js
import { isoStringFrom } from './date';
import { format } from 'date-fns';

describe('isoStringFrom', () => {
    const timeZone = 'Asia/Tokyo';
    test('should correctly combine date and time strings', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = isoStringFrom(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle missing year and time string gracefully', () => {
        const dateStr = '0000.05.26';
        const result = isoStringFrom(dateStr);
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle invalid time string gracefully', () => {
        const dateStr = '0000.05.26';
        const timeStr = 'invalid time';
        const result = isoStringFrom(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle date string without year correctly', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = isoStringFrom(dateStr, timeStr);
        // const expectedDate = new Date(2024, 4, 26, 13, 45);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });
});