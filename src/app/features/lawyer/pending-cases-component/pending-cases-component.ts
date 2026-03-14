import { Component, OnInit, inject, signal } from '@angular/core';
import {DatePipe, SlicePipe} from '@angular/common';
import { LegalCaseResponse } from '../../../core/models/models';
import {CaseService} from '../../../core/services/case-service';

@Component({
  selector: 'app-pending-cases-component',
  standalone: true,
  imports: [DatePipe, SlicePipe],
  templateUrl: './pending-cases-component.html',
  styleUrl: './pending-cases-component.scss',
})
export class PendingCasesComponent implements OnInit {
  private caseService = inject(CaseService);

  cases = signal<LegalCaseResponse[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  accepting = signal<string | null>(null);

  ngOnInit() { this.loadPage(0); }

  loadPage(p: number) {
    this.page.set(p);
    this.loading.set(true);
    this.caseService.getPendingCases({ page: p, size: 10 }).subscribe({
      next: (res) => {
        this.cases.set(res.content);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  accept(id: string) {
    this.accepting.set(id);
    this.caseService.acceptCase(id).subscribe({
      next: () => {
        this.cases.update(list => list.filter(c => c.id !== id));
        this.accepting.set(null);
      },
      error: () => this.accepting.set(null)
    });
  }
}
