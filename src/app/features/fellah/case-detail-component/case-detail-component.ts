import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LegalCaseResponse } from '../../../core/models/models';
import {CaseService} from '../../../core/services/case-service';

@Component({
  selector: 'app-case-detail-component',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './case-detail-component.html',
  styleUrl: './case-detail-component.scss',
  standalone: true
})
export class CaseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private caseService = inject(CaseService);

  case = signal<LegalCaseResponse | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.caseService.getCase(id).subscribe({
      next: (c) => {
        this.case.set(c);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading case:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
