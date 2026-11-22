import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { DatePipe ,isPlatformBrowser} from '@angular/common';
import { BookingService} from '../../shared/service/bookingservice';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe,RouterLink],
  selector: 'app-bookings',
  styleUrl: './bookings.css',
  templateUrl: './bookings.html',
})
export class Bookings {
   private api = inject(BookingService);
  private platformId = inject(PLATFORM_ID);

  tab = signal('tours');
  tours = signal<any[]>([]);
  rooms = signal<any[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    // Load data only in the browser (SSR server cannot reach the https localhost API)
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.getTours().subscribe({
      next: (t: any[]) => { this.tours.set(t); this.loading.set(false); },
      error: () => { this.error.set('Unable to reach the server.'); this.loading.set(false); }
    });

    this.api.getRooms().subscribe({
      next: (r: any[]) => this.rooms.set(r),
      error: () => this.error.set('Unable to reach the server.')
    });
  }

  removeTour(id: number): void {
    if (!confirm('Cancel this journey?')) return;
    this.api.deleteTour(id).subscribe(() => {
      this.tours.update(list => list.filter(t => t.id !== id));
    });
  }

  removeRoom(id: number): void {
    if (!confirm('Cancel this reservation?')) return;
    this.api.deleteRoom(id).subscribe(() => {
      this.rooms.update(list => list.filter(r => r.id !== id));
    });
  }
}


