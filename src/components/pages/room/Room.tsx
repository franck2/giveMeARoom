import { useGetRoomDetails } from '../../../api/rooms/calls/useGetRoomDetails';
import { RoomHeader } from './RoomHeader';
import { TimeLine } from './timeline/TimeLine';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();

    return (
        <>
            {roomDetails && <RoomHeader roomName={roomDetails?.name}/>}
            <div>MyRoom</div>
            {roomDetails?.id && <TimeLine idRoom={roomDetails.id} />}
        </>);
};
