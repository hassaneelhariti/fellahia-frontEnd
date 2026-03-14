import { Component, OnInit, inject, signal } from '@angular/core';
import {DatePipe, SlicePipe} from '@angular/common';
import { LegalCaseResponse } from '../../../core/models/models';
import {CaseService} from '../../../core/services/case-service';

@Component({
  selector: 'app-my-lawyer-cases-component',
  standalone: true,
  imports: [DatePipe, SlicePipe],
  templateUrl: './my-lawyer-cases-component.html',
  styleUrl: './my-lawyer-cases-component.scss',
})
export class MyLawyerCasesComponent implements OnInit {
  private caseService = inject(CaseService);

  cases = signal<LegalCaseResponse[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);

  ngOnInit() { this.loadPage(0); }

  loadPage(p: number) {
    this.page.set(p);
    this.loading.set(true);
    this.caseService.getLawyerCases({ page: p, size: 10 }).subscribe({
      next: (res) => {
        this.cases.set(res.content);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
