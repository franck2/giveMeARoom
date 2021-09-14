import { RoomStatusEnum } from './RoomStatusEnum';

export interface ITimeLineBloc {
    minutesFromBegining: number,
    minutesDuration: number,
    status: RoomStatusEnum,
}
