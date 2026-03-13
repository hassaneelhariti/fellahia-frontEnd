import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink]
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);

  phone = '';
  loading = false;
  resending = false;
  error = '';
  resendCooldown = 0;
  private cooldownInterval: any;

  digits = this.fb.array(
    Array(6).fill(null).map(() => this.fb.control('', [Validators.required, Validators.pattern(/^\d$/)]))
  );

  ngOnInit() {
    this.phone = this.route.snapshot.queryParams['phone'] ?? '';
  }

  ngOnDestroy() {
    clearInterval(this.cooldownInterval);
  }

  get otp(): string {
    return this.digits.controls.map(c => c.value).join('');
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.digits.at(index).setValue(val);
    input.value = val;
    if (val && index < 5) {
      const next = input.closest('.otp-row')?.querySelectorAll('input')[index + 1] as HTMLInputElement;
      next?.focus();
    }
  }

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits.at(index).value && index > 0) {
      const prev = (event.target as HTMLInputElement).closest('.otp-row')?.querySelectorAll('input')[index - 1] as HTMLInputElement;
      prev?.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) ?? '';
    text.split('').forEach((char, i) => this.digits.at(i)?.setValue(char));
  }

  submit() {
    if (this.otp.length !== 6) return;
    this.loading = true;
    this.error = '';
    this.auth.verifyOtp({ phone: this.phone, code: this.otp }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => { this.error = e.error?.message || 'رمز غير صحيح'; this.loading = false; }
    });
  }

  resend() {
    if (this.resendCooldown > 0) return;
    this.resending = true;
    this.auth.resendOtp(this.phone).subscribe({
      next: () => {
        this.resending = false;
        this.resendCooldown = 60;
        this.cooldownInterval = setInterval(() => {
          this.resendCooldown--;
          if (this.resendCooldown <= 0) clearInterval(this.cooldownInterval);
        }, 1000);
      },
      error: () => { this.resending = false; }
    });
  }
}
