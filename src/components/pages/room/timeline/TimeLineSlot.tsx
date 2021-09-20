import { useCallback } from 'react';

import { useGetUser } from '../../../../api/users/calls/useGetUser';
import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { RoomStatusEnum } from '../../../../types/components/pages/room/timeline/RoomStatusEnum';
import { PopoverCustom } from '../../../common/PopoverCustom';
import { getSlotSize } from './helpers/slotCalculation';
import { UserInformations } from './UserInformations';
import './scss/TimeLineSlot.scss';
import './scss/TimeLineHourBloc.scss';

interface ITimeLineSlotProps {
    slot: ITimeLineBloc,
}

export const TimeLineSlot = ({ slot }: ITimeLineSlotProps) => {
    const { translateBooking } = useTranslateBooking();
    const { user, handleGetUser } = useGetUser();

    const handleDisplaySlotInformation = useCallback(() => {
        if (slot.booking?.userId) {
            handleGetUser(slot.booking?.userId);
        }
    },
    [slot.booking?.userId, handleGetUser]);

    return (
        <PopoverCustom
            baseId={''}
            disabled={!slot.booking || slot.status === RoomStatusEnum.FREE}
            label={
                translateBooking(
                    TranslateBookingKeys[`slotIs${slot.status}` as keyof typeof TranslateBookingKeys],
                )
            }
            disclosure={
                <div
                    role="button"
                    aria-label={
                        translateBooking(
                            TranslateBookingKeys[`slotIs${slot.status}` as keyof typeof TranslateBookingKeys],
                        )
                    }
                    tabIndex={0}
                    className={`slot-container__col-${getSlotSize(slot)} ${slot.status}`}
                    onClick={handleDisplaySlotInformation}
                />
            }
        >
            <UserInformations userName={user?.name || ''} slot={slot} />
        </PopoverCustom>
    );
};
