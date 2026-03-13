import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  roles = [
    { value: 'FELLAH', label: 'فلاح' },
    { value: 'AVOCAT', label: 'محامي' }
  ];

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+212|0)[5-7]\d{8}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['FELLAH', Validators.required]
  });

  loading = false;
  error = '';

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.auth.register(this.form.value as any).subscribe({
      next: (res) => this.router.navigate(['/auth/verify-otp'], { queryParams: { phone: res.phone } }),
      error: (e) => {
        this.error = e.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
