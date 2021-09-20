import { useCallback, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { getNockForGetInError, getNockForGetInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseGetResource } from '../../../../tests/mocks/mocksBooking';
import { getResourceApi } from '../../helpers/apiLoginContants';
import { useRoomApi } from '../../useRoomsApi';

const StubGetResource = () => {
    const { getResource } = useRoomApi();
    const [dataToVerify, setDataToVerify] = useState<string>('');

    const handleGetRessource = useCallback(
        () => {
            getResource().then((response) => {
                setDataToVerify(response.id);
            })
                .catch(() => {
                    setDataToVerify('inError');
                });
        },
        [getResource],
    );

    return (
        <>
            <button data-testid={'getResource'} onClick={handleGetRessource} />
            <div>{dataToVerify}</div>
        </>
    );
};

describe('useRoomApi', () => {
    test('should getResource return success response data without throwing exception', async () => {
        getNockForGetInSuccess(getResourceApi, mockResponseGetResource);
        render(<StubGetResource />);

        const button = screen.getByTestId('getResource');

        userEvent.click(button);


        expect(await screen.findByText('idResource')).toBeDefined();
    });

    test('should getResource return errors without throwing exception', async () => {
        getNockForGetInError(getResourceApi);
        render(<StubGetResource />);

        const button = screen.getByTestId('getResource');

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
