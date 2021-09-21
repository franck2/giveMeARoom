import { IBookingPost } from '../../types/api/IBookingPost';
import { IPostBookingResult } from '../../types/api/IPostBookingResult';
import { IResultApi } from '../../types/api/IResultApi';
import { IRoomBookingBack, IRoomBookingFront } from '../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../types/components/pages/room/IRoomDetails';

export const mockRoomDetails: IRoomDetails = {
    id: 'idResource',
    bookingDurationStep: 10,
    maximumBookingDuration: 90,
    minimumBookingDuration: 10,
    name: 'resource',
};

export const mockResponseGetResource: IResultApi<IRoomDetails> = {
    data: {
        id: 'idResource',
        bookingDurationStep: 10,
        maximumBookingDuration: 90,
        minimumBookingDuration: 10,
        name: 'resource',
    },
    success: true,
};

export const mockResponseNull: IResultApi<null> = {
    data: null,
    success: true,
};


export const mockResponseGetBookings: IResultApi<IRoomBookingBack[]> = {
    data: [
        {
            end: '2021-09-20T19:33:51.722Z',
            id: 'mockBookingId',
            name: 'mockBookingName',
            start: '2021-09-20T18:33:51.722Z',
            userId: 'mockUserId',
        },
    ],
    success: true,

};

export const mockBookingParamsPost: IBookingPost = {
    name: 'bookingName',
    duration: 50,
};

export const mockBookingPostResult: IResultApi<IPostBookingResult> = {
    data: {
        bookingId: 'newBookingId',
    },
    success: true,
};


export const mockBookingsFront: IRoomBookingFront[] = [
    {
        end: new Date('2020-10-23 17:11'),
        start: new Date('2020-10-23 18:11'),
        id: 'idBooking',
        name: 'nameBooking',
        userId: 'userId',
    },
];
