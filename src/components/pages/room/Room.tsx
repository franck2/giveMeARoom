import { useHandleRoomBooking } from '../../../api/rooms/calls/useGetRoomBooking';
import { useGetRoomDetails } from '../../../api/rooms/calls/useGetRoomDetails';
import { RoomBody } from './body/RoomBody';
import { RoomHeader } from './header/RoomHeader';
import { TimeLine } from './timeline/TimeLine';

import './scss/Room.scss';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();
    const {
        bookings,
        handleResetBooking,
        handleGetBooking,
        handleDeleteBooking,
    } = useHandleRoomBooking(roomDetails?.id);

    return (
        <>
            {
                roomDetails &&
                <RoomHeader
                    roomName={roomDetails?.name}
                    handleResetBooking={handleResetBooking}
                />
            }
            <div className={'body-container'}>
                {
                    bookings && roomDetails &&
                <RoomBody
                    bookings={bookings}
                    roomDetails={roomDetails}
                    handleGetBooking={handleGetBooking}
                    handleDeleteBooking={handleDeleteBooking}
                />
                }
                <div className={'room-timeline '}>
                    {bookings && <TimeLine bookings={bookings} />}
                </div>
            </div>
        </>);
};
