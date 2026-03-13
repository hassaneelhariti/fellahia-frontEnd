// fellah-dashboard-component.ts
import {Component, OnInit} from '@angular/core';
import {UserProfileResponse} from '../../../core/models/models';
import {UserService} from '../../../core/services/user-service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-fellah-dashboard-component',
  imports: [
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './fellah-dashboard-component.html',
  styleUrl: './fellah-dashboard-component.scss',
})
export class FellahDashboardComponent implements OnInit {
  profile: UserProfileResponse | null = null;
  loading = true;
  error = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (p) => {
        this.profile = p;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
