// import { Service } from '@angular/core';

// @Service()
// export class Booking {}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private api = 'https://localhost:7084/api';

   getTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/TourBooking`);
  }
  createTour(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/TourBooking`, data);
  }
  deleteTour(id: number): Observable<any> {
    return this.http.delete(`${this.api}/TourBooking/${id}`);
  }

   getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/RoomReservation`);
  }
  createRoom(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/RoomReservation`, data);
  }
  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.api}/RoomReservation/${id}`);
  }
}