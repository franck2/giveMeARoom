import { IRoomBookingFront } from '../../types/components/pages/room/IRoomBooking';
import { getNexBookingFromDate } from '../booking';

describe('getNexBookingFromDate', () => {
    beforeAll(() => {
        jest
            .useFakeTimers('modern')
            .setSystemTime(new Date('2020-10-23 10:20').getTime());
    });

    test('should return no booking when all bookings are before choosen time', () => {
        const current = new Date();
        const booking: IRoomBookingFront[] = [
            {
                id: 'firstOne',
                start: new Date('2020-10-23 10:11'),
                end: new Date('2020-10-23 10:16'),
                name: 'name1',
                userId: 'userId',
            },
        ];

        const nexBooking = getNexBookingFromDate(current, booking);

        expect(nexBooking?.id).toBeUndefined();
    });

    test('should return no booking even if on book have its end time equald to date', () => {
        const current = new Date();
        const booking: IRoomBookingFront[] = [
            {
                id: 'firstOne',
                start: new Date('2020-10-23 08:00'),
                end: new Date('2020-10-23 10:00'),
                name: 'name1',
                userId: 'userId',
            },
        ];

        const nexBooking = getNexBookingFromDate(current, booking);

        expect(nexBooking?.id).toBeUndefined();
    });

    test('should return one booking if the choosen date is betwween start and end time', () => {
        const current = new Date();
        const booking: IRoomBookingFront[] = [
            {
                id: 'firstOne',
                start: new Date('2020-10-23 08:00'),
                end: new Date('2020-10-23 10:30'),
                name: 'name1',
                userId: 'userId',
            },
        ];

        const nexBooking = getNexBookingFromDate(current, booking);

        expect(nexBooking?.id).toBe('firstOne');
    });

    test('should return one booking if the choosen date is equals to the start time', () => {
        const current = new Date();
        const booking: IRoomBookingFront[] = [
            {
                id: 'firstOne',
                start: new Date('2020-10-23 10:00'),
                end: new Date('2020-10-23 10:30'),
                name: 'name1',
                userId: 'userId',
            },
        ];

        const nexBooking = getNexBookingFromDate(current, booking);

        expect(nexBooking?.id).toBe('firstOne');
    });

    test('should return one booking if the choosen date is lesser to the start time', () => {
        const current = new Date();
        const booking: IRoomBookingFront[] = [
            {
                id: 'firstOne',
                start: new Date('2020-10-23 10:30'),
                end: new Date('2020-10-23 12:00'),
                name: 'name1',
                userId: 'userId',
            },
        ];

        const nexBooking = getNexBookingFromDate(current, booking);

        expect(nexBooking?.id).toBe('firstOne');
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
