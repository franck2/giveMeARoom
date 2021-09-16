import { useGetRoomDetails } from '../../../api/rooms/calls/useGetRoomDetails';
import { RoomBody } from './body/RoomBody';
import { RoomHeader } from './header/RoomHeader';
import { TimeLine } from './timeline/TimeLine';
import './scss/Room.scss';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();

    return (
        <>
            {
                roomDetails &&
                <RoomHeader roomName={roomDetails?.name}/>
            }
            <div className={'body-container'}>
                <RoomBody />
                <div className={'room-timeline '}>
                    {roomDetails?.id && <TimeLine idRoom={roomDetails.id} />}
                </div>
            </div>
        </>);
};
