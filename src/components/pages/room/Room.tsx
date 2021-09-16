import { useGetRoomBooking } from '../../../api/rooms/calls/useGetRoomBooking';
import { useGetRoomDetails } from '../../../api/rooms/calls/useGetRoomDetails';
import { RoomBody } from './body/RoomBody';
import { RoomHeader } from './header/RoomHeader';
import { TimeLine } from './timeline/TimeLine';
import './scss/Room.scss';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();
    const { bookings } = useGetRoomBooking(roomDetails?.id);

    return (
        <>
            {
                roomDetails &&
                <RoomHeader roomName={roomDetails?.name}/>
            }
            <div className={'body-container'}>
                {bookings && <RoomBody bookings={bookings} />}
                <div className={'room-timeline '}>
                    {bookings && <TimeLine bookings={bookings} />}
                </div>
            </div>
        </>);
};
