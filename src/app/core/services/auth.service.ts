import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest, OtpVerifyRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private baseUrl = 'http://localhost:8080/api/auth';

  currentUser = signal<AuthResponse | null>(this.loadUser());

  private loadUser(): AuthResponse | null {
    if (!this.isBrowser) return null;
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  login(body: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body).pipe(
      tap(res => this.saveSession(res))
    );
  }

  register(body: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, body).pipe(
      tap(res => this.saveSession(res))
    );
  }

  private saveSession(res: AuthResponse) {
    if (!this.isBrowser) return;
    localStorage.setItem('token', res.accessToken);
    localStorage.setItem('user', JSON.stringify(res));
    this.currentUser.set(res);
  }

  verifyOtp(body: OtpVerifyRequest) {
    return this.http.post(`${this.baseUrl}/verify-otp`, body);
  }

  resendOtp(phone: string) {
    return this.http.post(`${this.baseUrl}/resend-otp`, null, { params: { phone } });
  }

  logout() {
    if (this.isBrowser) localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  get token(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean { return !!this.token; }
  get role(): string | null { return this.currentUser()?.role ?? null; }
}
