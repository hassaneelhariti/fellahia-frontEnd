import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { inject } from '@angular/core';


@Component({
  selector: 'app-login.component',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  private fb=inject(FormBuilder)
  form = this.fb.group({
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  loading = false;
  error = '';


  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        if (!res.verified) {
          this.router.navigate(['/auth/verify-otp'], { queryParams: { phone: res.phone } });
        } else {
          this.router.navigate([res.role === 'FELLAH' ? '/fellah/dashboard' : '/lawyer/dashboard']);
        }
      },
      error: (e) => { this.error = e.error?.message || 'Login failed'; this.loading = false; }
    });
  }
}
