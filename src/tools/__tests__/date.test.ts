import { mockDefaultDate } from '../../setupTests';
import { getDisplayTime, isBetween, isSameOrAfterTime, isSameOrBeforeTime } from '../date';

beforeAll(() => {
    jest
        .useFakeTimers('modern')
        .setSystemTime(new Date(mockDefaultDate).getTime());
});

describe('getDisplayTime', () => {
    test('should return 10:20 with the current date', () => {
        const dateString = getDisplayTime(new Date());

        expect(dateString).toBe('10:20');
    });
});

describe('isSameOrAfterTime', () => {
    test('should be truthy for same date time', () => {
        const dateString = isSameOrAfterTime(new Date(), new Date('2020-10-23 10:20'));

        expect(dateString).toBeTruthy();
    });

    test('should be truthy for lesser date time', () => {
        const dateString = isSameOrAfterTime(new Date(), new Date('2020-10-23 09:20'));

        expect(dateString).toBeTruthy();
    });

    test('should be falsy for greater date time', () => {
        const dateString = isSameOrAfterTime(new Date(), new Date('2020-10-23 12:20'));

        expect(dateString).toBeFalsy();
    });
});

describe('isSameOrBeforeTime', () => {
    test('should be truthy for same date time', () => {
        const dateString = isSameOrBeforeTime(new Date(), new Date('2020-10-23 10:20'));

        expect(dateString).toBeTruthy();
    });

    test('should be falsy for lesser date time', () => {
        const dateString = isSameOrBeforeTime(new Date(), new Date('2020-10-23 09:20'));

        expect(dateString).toBeFalsy();
    });

    test('should be truth for greater date time', () => {
        const dateString = isSameOrBeforeTime(new Date(), new Date('2020-10-23 12:20'));

        expect(dateString).toBeTruthy();
    });
});

describe('isBetween', () => {
    test('should be truthy if date is equals to start', () => {
        const dateString = isBetween(new Date(), new Date('2020-10-23 10:20'), new Date('2020-10-23 10:40'));

        expect(dateString).toBeTruthy();
    });

    test('should be truthy if date is equals to end', () => {
        const dateString = isBetween(new Date(), new Date('2020-10-23 09:20'), new Date('2020-10-23 10:20'));

        expect(dateString).toBeTruthy();
    });

    test('should be truthy if date is between start and end', () => {
        const dateString = isBetween(new Date(), new Date('2020-10-23 08:20'), new Date('2020-10-23 11:20'));

        expect(dateString).toBeTruthy();
    });

    test('should be falsy if date is before start', () => {
        const dateString = isBetween(new Date(), new Date('2020-10-23 12:20'), new Date('2020-10-23 13:20'));

        expect(dateString).toBeFalsy();
    });

    test('should be falsy if date is after end', () => {
        const dateString = isBetween(new Date(), new Date('2020-10-23 08:20'), new Date('2020-10-23 09:20'));

        expect(dateString).toBeFalsy();
    });
});

afterAll(() => {
    jest.useRealTimers();
});
