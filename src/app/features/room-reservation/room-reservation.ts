import { Component,inject,signal } from '@angular/core';
import {
  AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators
} from '@angular/forms';
import { BookingService } from '../../shared/service/bookingservice';

function dateRange(g: AbstractControl): ValidationErrors | null {
  const i = g.get('checkIn')?.value;
  const o = g.get('checkOut')?.value;
  return i && o && o <= i ? { range: true } : null;
}


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-room-reservation',
  styleUrl: './room-reservation.css',
  templateUrl: './room-reservation.html',
})
export class RoomReservation {
  private fb = inject(FormBuilder);
  private api = inject(BookingService);

  today = new Date().toISOString().split('T')[0];
  sending = signal(false);
  message = signal('');
  error = signal('');

  form = this.fb.nonNullable.group(
    {
      guestName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      specialRequests: ['']
    },
    { validators: dateRange }
  );

  get nights(): number {
    const i = this.form.value.checkIn;
    const o = this.form.value.checkOut;
    if (!i || !o) return 0;
    const d = (new Date(o).getTime() - new Date(i).getTime()) / 86400000;
    return d > 0 ? d : 0;
  }

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
    this.api.createRoom(this.form.getRawValue()).subscribe({
      next: (r: any) => {
        this.sending.set(false);
        this.message.set(`Your suite is reserved. Reference #${r.id}`);
        this.form.reset({ adults: 1, children: 0 });
      },
      error: () => {
        this.sending.set(false);
        this.error.set('We could not complete your reservation. Please make sure the server is running.');
      }
    });
  }
}

