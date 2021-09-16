import { Clock } from '../../../common/Clock';
import './scss/RoomHeader.scss';

interface IRoomHeaderProps {
    roomName: string,
}

export const RoomHeader = ({ roomName }: IRoomHeaderProps) => (
    <div className={'room-bar-container'}>
        <div className={'room-bar-container__row'}>
            <div className={'room-bar-container__col-2'}></div>
            <div className={'room-bar-container__col-8'}>{roomName}</div>
            <div className={'room-bar-container__col-2'}><Clock/></div>
        </div>
    </div>);
