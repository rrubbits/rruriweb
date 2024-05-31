import { localedDateStringFrom, timeStringFrom, isoStringFromStrings } from './date';
import { formatInTimeZone } from 'date-fns-tz';
import { jest } from '@jest/globals';
import { ja } from 'date-fns/locale';

// Mock the `formatInTimeZone` function to ensure consistent test results
// jest.mock('date-fns-tz', () => ({
//   ...jest.requireActual('date-fns-tz'),
//   formatInTimeZone: jest.fn((date, timeZone, format, options) => {
//     return jest.requireActual('date-fns').format(
//       new Date(date),
//       format,
//       options
//     );
//   }),
// }));

describe('Date formatting functions', () => {
  const timeZone = 'Asia/Tokyo';

  test('localeStringFromISOString should format ISO string to locale date string', () => {
    const ISOString = '2024-05-26T00:00:00Z'
    const formattedDate = localedDateStringFrom(ISOString)
    expect(formattedDate).toBe('5/26 (日)') // Assuming date is Sunday
  });

  test('timeStringFrom should format ISO string to locale time string', () => {
    const ISOString = '2024-05-26T22:45:00+09:00' //'2024-05-26T13:45:00Z';
    const formattedTime = timeStringFrom(ISOString)
    expect(formattedTime).toBe('22:45') // Assuming 9 hours difference from UTC to JST
  });

  test('localeStringFromISOString should handle invalid date string gracefully', () => {
    const ISOString = 'invalid-date-string'
    expect(() => localedDateStringFrom(ISOString)).toThrow(Error)
  });

  test('timeStringFrom should handle invalid date string gracefully', () => {
    const ISOString = 'invalid-date-string'
    expect(() => timeStringFrom(ISOString)).toThrow(Error)
  });
});


describe('isoStringFrom', () => {
    const timeZone = 'Asia/Tokyo';
    test('should correctly combine date and time strings', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = isoStringFromStrings(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle missing year and time string gracefully', () => {
        const dateStr = '0000.05.26';
        const result = isoStringFromStrings(dateStr);
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle invalid time string gracefully', () => {
        const dateStr = '0000.05.26';
        const timeStr = 'invalid time';
        const result = isoStringFromStrings(dateStr, timeStr);
        const expectedLocalString = "2024-05-26T00:00:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });

    test('should handle date string without year correctly', () => {
        const dateStr = '2024.05.26';
        const timeStr = '13:45';
        const result = isoStringFromStrings(dateStr, timeStr);
        // const expectedDate = new Date(2024, 4, 26, 13, 45);
        const expectedLocalString = "2024-05-26T13:45:00.000+09:00"
        expect(result).toBe(expectedLocalString);
    });
});