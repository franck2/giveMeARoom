import { useCallback, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { getNockForGetInError, getNockForGetInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseGetBookings } from '../../../../tests/mocks/mocksBooking';
import { bookingsApi } from '../../helpers/apiLoginContants';
import { useRoomApi } from '../../useRoomsApi';

const StubGetBooking = () => {
    const { getBooking } = useRoomApi();
    const [dataToVerify, setDataToVerify] = useState<string>('');

    const handleGetRessource = useCallback(
        () => {
            getBooking().then((response) => {
                setDataToVerify(response[0].id);
            })
                .catch(() => {
                    setDataToVerify('inError');
                });
        },
        [getBooking],
    );

    return (
        <>
            <button data-testid={'getBooking'} onClick={handleGetRessource} />
            <div>{dataToVerify}</div>
        </>
    );
};

describe('useRoomApi', () => {
    test('should getBooking return success response data without throwing exception', async () => {
        getNockForGetInSuccess(bookingsApi, mockResponseGetBookings);
        render(<StubGetBooking />);

        const button = screen.getByTestId('getBooking');

        userEvent.click(button);


        expect(await screen.findByText('mockBookingId')).toBeDefined();
    });

    test('should getBooking return errors without throwing exception', async () => {
        getNockForGetInError(bookingsApi);
        render(<StubGetBooking />);

        const button = screen.getByTestId('getBooking');

        userEvent.click(button);


        expect(await screen.findByText('inError')).toBeDefined();
    });
});

afterAll(() => {
    nock.restore();
});

afterEach(() => {
    nock.cleanAll();
});
