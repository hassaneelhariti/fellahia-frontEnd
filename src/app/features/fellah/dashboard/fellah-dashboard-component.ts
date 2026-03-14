import { Component, OnInit, signal, inject } from '@angular/core';
import { UserProfileResponse } from '../../../core/models/models';
import { UserService } from '../../../core/services/user-service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fellah-dashboard-component',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './fellah-dashboard-component.html',
  styleUrl: './fellah-dashboard-component.scss',
})
export class FellahDashboardComponent implements OnInit {
  private userService = inject(UserService);

  profile = signal<UserProfileResponse | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
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
}
