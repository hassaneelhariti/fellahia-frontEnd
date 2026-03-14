import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CaseService} from '../../../core/services/case-service';

@Component({
  selector: 'app-case-submit-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './case-submit-component.html',
  styleUrl: './case-submit-component.scss',
})
export class CaseSubmitComponent {
  private fb = inject(FormBuilder);
  private caseService = inject(CaseService);
  router = inject(Router);

  urgencies = [
    { value: 'NORMAL',       label: 'عادي',       hint: 'الرد خلال ٤٨ ساعة',        icon: 'bi bi-info-circle-fill',    class: 'normal'      },
    { value: 'URGENT',       label: 'عاجل',        hint: 'الرد خلال ٢٤ ساعة',        icon: 'bi bi-exclamation-circle-fill', class: 'urgent'  },
    { value: 'VERY_URGENT',  label: 'عاجل جداً',   hint: 'رد فوري من المستشار',      icon: 'bi bi-lightning-charge-fill',  class: 'very_urgent' },
  ];

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(3000)]],
    urgency:     ['NORMAL', Validators.required],
    region:      ['', Validators.maxLength(100)],
  });

  files   = signal<File[]>([]);
  loading = signal(false);
  error   = signal('');

  onFiles(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) this.files.set(Array.from(input.files));
  }

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');
    this.caseService.submitCase(this.form.value as any, this.files()).subscribe({
      next: (c) => this.router.navigate(['/fellah/cases', c.id]),
      error: (e) => {
        this.error.set(e.error?.message || 'فشل إرسال الطلب، يرجى المحاولة مجدداً.');
        this.loading.set(false);
      }
    });
  }
}
