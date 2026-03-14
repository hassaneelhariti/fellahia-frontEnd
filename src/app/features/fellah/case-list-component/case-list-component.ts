import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';
import { LegalCaseResponse } from '../../../core/models/models';
import {CaseService} from '../../../core/services/case-service';

@Component({
  selector: 'app-case-list-component',
  imports: [RouterLink, DatePipe, SlicePipe],
  templateUrl: './case-list-component.html',
  styleUrl: './case-list-component.scss',
})
export class CaseListComponent implements OnInit {
  private caseService = inject(CaseService);

  // ← Must be signals with zoneless, plain properties don't trigger re-render
  cases = signal<LegalCaseResponse[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(p: number) {
    this.page.set(p);
    this.loading.set(true);
    this.caseService.getMyCases({ page: p, size: 9 }).subscribe({
      next: (res) => {
        this.cases.set(res.content);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
