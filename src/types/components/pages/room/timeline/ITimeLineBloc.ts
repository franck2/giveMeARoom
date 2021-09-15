import { IRoomBookingFront } from '../IRoomBooking';
import { RoomStatusEnum } from './RoomStatusEnum';

export interface ITimeLineBloc {
    startMinute: number,
    endMinute: number,
    status: RoomStatusEnum,
    booking?: IRoomBookingFront,
}
