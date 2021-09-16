import { getDisplayTime } from '../../../../tools/date';
import { useTranslateBooking } from '../../../../translate/hooks/useTranslateBooking';
import { useTranslateCommon } from '../../../../translate/hooks/useTranslateCommon';
import { TranslateBookingKeys } from '../../../../translate/keys/TranslateBookingKeys';
import { TranslateCommonKeys } from '../../../../translate/keys/TranslateCommonKeys';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';

interface IUserInformationsProps {
    userName: string,
    slot: ITimeLineBloc,
}
export const UserInformations = ({
    userName,
    slot,
}: IUserInformationsProps) => {
    const { translateBooking } = useTranslateBooking();

    return (
        <ul>
            <li>{`${translateBooking(TranslateBookingKeys.bookedBy)} ${userName}`}</li>
            <li>{
                `${slot.booking
                    ? translateBooking(TranslateBookingKeys.fromTo, {
                        from: getDisplayTime(slot.booking?.start),
                        to: getDisplayTime(slot.booking?.end),
                    })
                    : translateBooking(TranslateBookingKeys.unknowBookingTime)}`
            }
            </li>
        </ul>
    );
};
