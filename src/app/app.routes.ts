import { Routes } from '@angular/router';
import { Bookings } from './features/bookings/bookings';
import { Home } from './features/home/home';
import { RoomReservation } from './features/room-reservation/room-reservation';
import { TourBooking } from './features/tour-booking/tour-booking';

export const routes: Routes = [

    {path:'home',component:Home},
    {path:'bookings',component:Bookings},
    {path:'room-reservation',component:RoomReservation},
    { path: 'tour-booking/:id', component: TourBooking },
    {path:'tour-booking',component:TourBooking},
    { path: 'room-reservation/:id', component: RoomReservation },
    {path:'',component:Home}

];
