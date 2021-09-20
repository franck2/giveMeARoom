import { useCallback, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { getNockForPostInError, getNockForPostInSuccess } from '../../../../tests/mocks/mockApis';
import { mockBookingParamsPost, mockBookingPostResult } from '../../../../tests/mocks/mocksBooking';
import { bookingsApi } from '../../helpers/apiLoginContants';
import { useRoomApi } from '../../useRoomsApi';

const StubPostBooking = () => {
    const { postBooking } = useRoomApi();
    const [dataToVerify, setDataToVerify] = useState<string>('');

    const handleGetRessource = useCallback(
        () => {
            postBooking(mockBookingParamsPost).then((response) => {
                setDataToVerify(response.bookingId);
            })
                .catch(() => {
                    setDataToVerify('inError');
                });
        },
        [postBooking],
    );

    return (
        <>
            <button data-testid={'postBooking'} onClick={handleGetRessource} />
            <div>{dataToVerify}</div>
        </>
    );
};

describe('useRoomApi', () => {
    test('should postBooking return success response data without throwing exception', async () => {
        getNockForPostInSuccess(bookingsApi, mockBookingPostResult);
        render(<StubPostBooking />);

        const button = screen.getByTestId('postBooking');

        userEvent.click(button);


        expect(await screen.findByText('newBookingId')).toBeDefined();
    });

    test('should postBooking return errors without throwing exception', async () => {
        getNockForPostInError(bookingsApi);
        render(<StubPostBooking />);

        const button = screen.getByTestId('postBooking');

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
