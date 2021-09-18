import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { IconKeyEnum } from '../../../../types/components/common/icon/IconKeyEnum';
import { Clock } from '../../../common/Clock';
import { Icon } from '../../../common/icon/Icon';
import './scss/RoomHeader.scss';

interface IRoomHeaderProps {
    roomName: string,
    handleResetBooking: () => void,
}

export const RoomHeader = ({ roomName, handleResetBooking }: IRoomHeaderProps) => {
    const { translateBooking } = useTranslateBooking();

    return (
        <div className={'room-bar-container'}>
            <div className={'room-bar-container__row'}>
                <div className={'room-bar-container__col-3'}>
                    <button
                        role={'button'}
                        className={'reload-room'}
                        onClick={handleResetBooking}
                        aria-label={translateBooking(TranslateBookingKeys.reloadWithNewData)}
                    >
                        <Icon iconKey={IconKeyEnum.REFRESH} />
                    </button>
                </div>
                <div className={'room-bar-container__col-6'}>{roomName}</div>
                <div className={'room-bar-container__col-3'}><Clock/></div>
            </div>
        </div>
    );
};
