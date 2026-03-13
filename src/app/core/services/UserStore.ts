import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileResponse } from '../models/models';
import { UserService } from './user-service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService = inject(UserService);
  private router      = inject(Router);

  profile = signal<UserProfileResponse | null>(null);
  loading = signal(false);
  error   = signal(false);

  load() {
    if (this.profile()) return; // already loaded, don't fetch again
    this.loading.set(true);
    this.userService.getProfile().subscribe({
      next: (p) => {
        this.profile.set(p);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.profile.set(null);
    this.router.navigate(['/auth/login']);
  }

  onAvatarError($event: ErrorEvent) {
    console.log(event);
  }
}
