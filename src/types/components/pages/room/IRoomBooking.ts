export interface IRoomBookingBack {
    id: string,
    start: string,
    end: string,
    name: string,
    userId: string,
}


export interface IRoomBookingFront {
    id: string,
    start: Date,
    end: Date,
    name: string,
    userId: string,
}
