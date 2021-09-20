
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';

import { mockTranslate } from '../../../../tests/config/mockItranslate';
import { mockLogError } from '../../../../tests/config/mockLog';
import { getNockForGetInError, getNockForGetInSuccess } from '../../../../tests/mocks/mockApis';
import { mockResponseGetResource } from '../../../../tests/mocks/mocksBooking';
import { getResourceApi } from '../../helpers/apiLoginContants';
import { useGetRoomDetails } from '../useGetRoomDetails';

const StubGetResource = () => {
    const { roomDetails } = useGetRoomDetails();


    return (
        <>
            <div>{roomDetails?.id}</div>
        </>
    );
};

describe('useGetRoomDetails', () => {
    test('should hook return response of WS', async () => {
        getNockForGetInSuccess(getResourceApi, mockResponseGetResource);

        render(<StubGetResource />);

        expect(await screen.findByText('idResource')).toBeDefined();
    });

    test('should hook log error if ws fail', async () => {
        getNockForGetInError(getResourceApi);

        render(<StubGetResource />);

        await waitFor(() => expect(mockLogError).toBeCalledTimes(1));
        await waitFor(() => expect(mockTranslate).toBeCalledWith('common:errorWS', undefined));
        await waitFor(() => expect(mockTranslate).toBeCalledTimes(1));
    });
});

afterAll(() => {
    nock.restore();
});

afterEach(() => {
    nock.cleanAll();
});
