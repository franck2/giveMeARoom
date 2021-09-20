import { useCallback, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { getNockForGetInError, getNockForGetInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseNull } from '../../../../tests/mocks/mocksBooking';
import { getResetBooking } from '../../helpers/apiLoginContants';
import { useRoomApi } from '../../useRoomsApi';

const StubResetBooking = () => {
    const { resetBooking } = useRoomApi();
    const [dataToVerify, setDataToVerify] = useState<string>('');

    const handleGetRessource = useCallback(
        () => {
            resetBooking().then(() => {
                setDataToVerify('reset');
            })
                .catch(() => {
                    setDataToVerify('inError');
                });
        },
        [resetBooking],
    );

    return (
        <>
            <button data-testid={'resetBooking'} onClick={handleGetRessource} />
            <div>{dataToVerify}</div>
        </>
    );
};

describe('useRoomApi', () => {
    test('should resetBooking return success response data without throwing exception', async () => {
        getNockForGetInSuccess(getResetBooking, mockResponseNull);
        render(<StubResetBooking />);

        const button = screen.getByTestId('resetBooking');

        userEvent.click(button);


        expect(await screen.findByText('reset')).toBeDefined();
    });

    test('should resetBooking return errors without throwing exception', async () => {
        getNockForGetInError(getResetBooking);
        render(<StubResetBooking />);

        const button = screen.getByTestId('resetBooking');

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
