
import { useEffect, useState } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { millisecondsInMinute } from 'date-fns';
import nock from 'nock';

import { mockTranslate } from '../../../../tests/config/mockItranslate';
import { mockLogError, mockLogSuccess } from '../../../../tests/config/mockLog';
import { getNockForDeleteInError,
    getNockForDeleteInSuccess,
    getNockForGetInError,
    getNockForGetInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseGetBookings, mockResponseNull } from '../../../../tests/mocks/mocksBooking';
import { bookingsApi } from '../../helpers/apiLoginContants';
import { refreshEveryNMinutes } from '../helpers/roomCallConstants';
import { useHandleRoomBooking } from '../useHandleRoomBooking';

const mockIdBooking = 'idBooking';
const StubGetBooking = () => {
    const {
        bookings,
        handleDeleteBooking,
        handleResetBooking,
        handleGetBooking,
    } = useHandleRoomBooking();

    const [numberOfUpdates, setNumberOfUpdates] = useState<number>(0);

    useEffect(() => {
        setNumberOfUpdates((previous) => previous + 1);
    }, [bookings]);

    return (
        <>
            <div>{bookings ? bookings[0].id : 'no booking'}</div>
            <div>{`numberOfUpdates : ${numberOfUpdates}`}</div>
            <button data-testid={'handleDeleteBooking'} onClick={() => handleDeleteBooking(mockIdBooking)} />
            <button data-testid={'handleGetBooking'} onClick={handleGetBooking} />
            <button data-testid={'handleResetBooking'} onClick={handleResetBooking} />
        </>
    );
};

describe('useHandleRoomBooking', () => {
    test('should ws in success return mapped book', async () => {
        getNockForGetInSuccess(bookingsApi, mockResponseGetBookings);

        render(<StubGetBooking />);

        expect(screen.getByText('no booking')).toBeDefined();

        expect(await screen.findByText('mockBookingId')).toBeDefined();
    });

    test('should ws in error call log error', async () => {
        getNockForGetInError(bookingsApi);

        render(<StubGetBooking />);

        expect(screen.getByText('no booking')).toBeDefined();

        await waitFor(() => expect(mockLogError).toBeCalledTimes(1));
    });

    test('should ws be talled twice with settimeout', async () => {
        getNockForGetInError(bookingsApi);

        jest.useFakeTimers();
        jest.advanceTimersByTime(millisecondsInMinute * refreshEveryNMinutes);
        render(<StubGetBooking />);

        expect(screen.getByText('no booking')).toBeDefined();

        await waitFor(() => expect(mockLogError).toBeCalledTimes(2), {
            timeout: 20000,
        });
    });

    test('should delete booking in success call handleGetBook and log success', async () => {
        getNockForGetInSuccess(bookingsApi, mockResponseGetBookings);
        getNockForDeleteInSuccess(`${bookingsApi}/${mockIdBooking}`, mockResponseNull);

        render(<StubGetBooking />);

        const button = screen.getByTestId('handleDeleteBooking');

        userEvent.click(button);

        expect(await screen.findByText('numberOfUpdates : 3')).toBeDefined();
        expect(mockTranslate).toBeCalledWith('booking:bookingDeleted', undefined);
        expect(mockLogSuccess).toBeCalledTimes(1);
    });

    test('should delete booking in error call log error', async () => {
        getNockForGetInSuccess(bookingsApi, mockResponseGetBookings);
        getNockForDeleteInError(`${bookingsApi}/${mockIdBooking}`);

        render(<StubGetBooking />);

        const button = screen.getByTestId('handleDeleteBooking');

        userEvent.click(button);

        await waitFor(() => expect(mockTranslate).toBeCalledWith('common:errorWS', undefined));
        expect(mockLogError).toBeCalledTimes(1);
    });
});

afterAll(() => {
    nock.restore();
});

afterEach(() => {
    nock.cleanAll();
});
