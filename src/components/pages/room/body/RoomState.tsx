import { useTranslateCommon } from '../../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../../translate/keys/commonKeys';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';

import './scss/RoomState.scss';

interface IRoomStateProps {
    bookedSlot?: IRoomBookingFront,
}

export const RoomState = ({
    bookedSlot = {
        end: new Date(),
        id: '',
        name: 'toto',
        start: new Date(),
        userId: '',
    },
}: IRoomStateProps) => {
    const { translateCommon } = useTranslateCommon();

    return (
        <div className={'room-state'}>
            <div className={'room-msg'}>
                {
                    bookedSlot ?
                        translateCommon(CommonKeys.alreadyUsed, {
                            reason: 'toto',
                            userName: 'toto',
                            from: 'ahah',
                            to: 'ok',
                        }) :
                        translateCommon(CommonKeys.roomIsFree)
                }
            </div>
        </div>
    );
};
