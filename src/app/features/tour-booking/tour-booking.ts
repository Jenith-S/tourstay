import { Component ,inject,signal} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { BookingService} from '../../shared/service/bookingservice';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tour-booking',
  styleUrl: './tour-booking.css',
  templateUrl: './tour-booking.html',
})
export class TourBooking {
  private fb = inject(FormBuilder);
  private api = inject(BookingService);

   today = new Date().toISOString().split('T')[0];
  sending = signal(false);
  message = signal('');
  error = signal('');

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    visitDate: ['', Validators.required],
    groupSize: [1, [Validators.required, Validators.min(1)]],
    interestedTours: ['', Validators.required],
    contactMethod: ['Email', Validators.required]
  });

  invalid(name: string): boolean {
    const c = this.form.get(name)!;
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    this.message.set('');
    this.error.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.api.createTour(this.form.getRawValue()).subscribe({
      next: (r: any) => {
        this.sending.set(false);
        this.message.set(`Your journey is confirmed. Reference #${r.id}`);
        this.form.reset({ groupSize: 1, contactMethod: 'Email' });
      },
      error: () => {
        this.sending.set(false);
        this.error.set('We could not complete your booking. Please make sure the server is running.');
      }
    });
  }
}


