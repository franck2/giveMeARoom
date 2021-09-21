import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { bookingsApi } from '../../../../../../api/rooms/helpers/apiLoginContants';
import { mockDefaultDate } from '../../../../../../setupTests';
import { mockTranslate } from '../../../../../../tests/config/mockItranslate';
import { mockLogSuccess } from '../../../../../../tests/config/mockLog';
import { getNockForPostInSuccess } from '../../../../../../tests/mocks/mockApis';
import { mockBookingPostResult, mockBookingsFront, mockRoomDetails } from '../../../../../../tests/mocks/mocksBooking';
import { ReservationForm } from '../ReservationForm';

describe('ReservationForm', () => {
    test('should msg information display the number of minute to book if we can book', () => {
        jest
            .useFakeTimers('modern')
            .setSystemTime(new Date(mockDefaultDate).getTime());
        const mockHandleGetBookingSpy = jest.fn();

        render(<ReservationForm
            bookings={mockBookingsFront}
            handleGetBooking={mockHandleGetBookingSpy}
            roomDetails={mockRoomDetails}
        />);

        expect(mockTranslate).toBeCalledWith('booking:bookFor', undefined);
        expect(mockTranslate).toBeCalledWith('booking:bookingDuration', {
            duration: '10',
        });
        expect(mockTranslate).toBeCalledWith('booking:decreaseBookDuration', undefined);
    });

    // eslint-disable-next-line max-len
    test('should msg information display a message that indicate the impossibility to book if we can\'t book', async () => {
        jest
            .useFakeTimers('modern')
            .setSystemTime(new Date(mockDefaultDate).getTime());
        const mockHandleGetBookingSpy = jest.fn();

        render(<ReservationForm
            bookings={
                [
                    {
                        ...mockBookingsFront[0],
                        start: new Date('2020-10-23 07:11'),
                        end: new Date('2020-10-23 22:11'),

                    },
                ]
            }
            handleGetBooking={mockHandleGetBookingSpy}
            roomDetails={mockRoomDetails}
        />);

        await waitFor(() => expect(mockTranslate).toBeCalledWith('booking:cantBook', undefined));
    });

    test('should Log success on post and getBookings be called after post success', async () => {
        getNockForPostInSuccess(bookingsApi, mockBookingPostResult);
        const mockHandleGetBookingSpy = jest.fn();

        render(<ReservationForm
            bookings={
                [
                    {
                        ...mockBookingsFront[0],
                        start: new Date('2020-10-23 07:11'),
                        end: new Date('2020-10-23 08:11'),

                    },
                ]
            }
            handleGetBooking={mockHandleGetBookingSpy}
            roomDetails={mockRoomDetails}
        />);

        const buttonSubmit = await screen.findByTestId('submit-reservation');

        userEvent.click(buttonSubmit);

        await waitFor(() => expect(mockLogSuccess).toBeCalledTimes(1));
        expect(mockHandleGetBookingSpy).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.useRealTimers();
    });
});
