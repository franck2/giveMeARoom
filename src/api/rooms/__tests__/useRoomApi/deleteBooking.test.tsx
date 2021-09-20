import { useCallback, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { getNockForDeleteInError, getNockForDeleteInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseNull } from '../../../../tests/mocks/mocksBooking';
import { bookingsApi } from '../../helpers/apiLoginContants';
import { useRoomApi } from '../../useRoomsApi';

const mockBookingIdToDelete = 'idBooking';

const StubDeleteBooking = () => {
    const { deleteBooking } = useRoomApi();
    const [dataToVerify, setDataToVerify] = useState<string>('');

    const handleGetRessource = useCallback(
        () => {
            deleteBooking(mockBookingIdToDelete).then(() => {
                setDataToVerify('booking deleted');
            })
                .catch(() => {
                    setDataToVerify('inError');
                });
        },
        [deleteBooking],
    );

    return (
        <>
            <button data-testid={'deleteBooking'} onClick={handleGetRessource} />
            <div>{dataToVerify}</div>
        </>
    );
};

describe('useRoomApi', () => {
    test('should deleteBooking return success response data without throwing exception', async () => {
        getNockForDeleteInSuccess(`${bookingsApi}/${mockBookingIdToDelete}`, mockResponseNull);
        render(<StubDeleteBooking />);

        const button = screen.getByTestId('deleteBooking');

        userEvent.click(button);


        expect(await screen.findByText('booking deleted')).toBeDefined();
    });

    test('should deleteBooking return errors without throwing exception', async () => {
        getNockForDeleteInError(`${bookingsApi}/${mockBookingIdToDelete}`);
        render(<StubDeleteBooking />);

        const button = screen.getByTestId('deleteBooking');

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
