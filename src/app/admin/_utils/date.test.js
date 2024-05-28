// datetimeFrom.test.js
import { datetimeFrom } from './date';
import { format } from 'date-fns';

describe('datetimeFrom', () => {
    test('should correctly combine date and time strings', () => {
        const dateStr = '0000.05.26';
        const timeStr = '13:45';
        const result = datetimeFrom(dateStr, timeStr);
        
        const expectedDate = new Date(2024, 4, 26, 13, 45);
        const expectedLocalString = format(expectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

        expect(result).toBe(expectedLocalString);
    });

    test('should handle missing time string gracefully', () => {
        const dateStr = '0000.05.26';
        const result = datetimeFrom(dateStr);
        
        const expectedDate = new Date(2024, 4, 26, 0, 0);
        const expectedLocalString = format(expectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

        expect(result).toBe(expectedLocalString);
    });

    test('should handle invalid time string gracefully', () => {
        const dateStr = '0000.05.26';
        const timeStr = 'invalid time';
        const result = datetimeFrom(dateStr, timeStr);
        
        const expectedDate = new Date(2024, 4, 26, 0, 0);
        const expectedLocalString = format(expectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

        expect(result).toBe(expectedLocalString);
    });

    test('should handle date string without year correctly', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = datetimeFrom(dateStr, timeStr);
        
        const expectedDate = new Date(2024, 4, 26, 13, 45);
        const expectedLocalString = format(expectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

        expect(result).toBe(expectedLocalString);
    });
});