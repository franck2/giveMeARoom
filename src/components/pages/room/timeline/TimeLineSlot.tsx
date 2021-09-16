import { useCallback } from 'react';

import { useGetUser } from '../../../../api/users/calls/useGetUser';
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
    const { user, handleGetUser } = useGetUser();
    const handleDisplaySlotInformation = useCallback(
        () => {
            if (slot.booking?.userId) {
                handleGetUser(slot.booking?.userId);
            }
        },
        [slot.booking?.userId, handleGetUser],
    );

    return (

        <PopoverCustom aria-label={'booked-room'}
            baseId={''}
            disabled={!slot.booking || slot.status === RoomStatusEnum.FREE}
            disclosure={
                <div
                    className={`slot-container__col-${getSlotSize(slot)} ${slot.status} slot-information`}
                    onClick={handleDisplaySlotInformation}
                />
            }
        >
            <UserInformations userName={user?.name || ''} slot={slot} />
        </PopoverCustom>
    );
};
