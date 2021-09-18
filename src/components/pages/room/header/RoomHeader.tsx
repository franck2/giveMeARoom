import { IconKeyEnum } from '../../../../types/components/common/icon/IconKeyEnum';
import { Clock } from '../../../common/Clock';
import { Icon } from '../../../common/icon/Icon';
import './scss/RoomHeader.scss';

interface IRoomHeaderProps {
    roomName: string,
    handleResetBooking: () => void,
}

export const RoomHeader = ({ roomName, handleResetBooking }: IRoomHeaderProps) => (
    <div className={'room-bar-container'}>
        <div className={'room-bar-container__row'}>
            <div className={'room-bar-container__col-3'}>
                <button
                    role={'button'}
                    className={'reload-room'}
                    onClick={handleResetBooking}
                >
                    <Icon iconKey={IconKeyEnum.REFRESH} />
                </button>
            </div>
            <div className={'room-bar-container__col-6'}>{roomName}</div>
            <div className={'room-bar-container__col-3'}><Clock/></div>
        </div>
    </div>
);
