import { getDisplayTime } from '../../../../tools/date';
import { useTranslateCommon } from '../../../../translate/hooks/useTranslateCommon';
import { CommonKeys } from '../../../../translate/keys/commonKeys';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';

interface IUserInformationsProps {
    userName: string,
    slot: ITimeLineBloc,
}
export const UserInformations = ({
    userName,
    slot,
}: IUserInformationsProps) => {
    const { translateCommon } = useTranslateCommon();


    return (
        <ul>
            <li>{`${translateCommon(CommonKeys.bookedBy)} ${userName}`}</li>
            <li>{
                `${slot.booking
                    ? translateCommon(CommonKeys.fromTo, {
                        from: getDisplayTime(slot.booking?.start),
                        to: getDisplayTime(slot.booking?.end),
                    })
                    : translateCommon(CommonKeys.unknowBookingTime)}`
            }
            </li>
        </ul>
    );
};
