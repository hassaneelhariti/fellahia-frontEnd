import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TopupService} from '../../../../core/services/topup-service';
import {BalanceResponse} from '../../../../core/models/models';

@Component({
  selector: 'app-bank-transfer',
  imports: [FormsModule],
  templateUrl: './bank-transfer-component.html',
  styleUrl: './bank-transfer-component.scss',
})
export class BankTransferComponent {
  private topupService = inject(TopupService);

  topupSuccess = output<BalanceResponse>();

  rib = '03 001 0123456789 01';
  iban = 'TN59 0300 1012 3456 7890 101';
  amount = signal<number | null>(null);
  loading = signal(false);
  error = signal('');
  copied = signal('');

  copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    this.copied.set(field);
    setTimeout(() => this.copied.set(''), 2000);
  }

  submit() {
    if (!this.amount() || this.amount()! <= 0) return;
    this.loading.set(true);
    this.error.set('');
    this.topupService.topup({ amount: this.amount()!, method: 'BANK_TRANSFER' }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.topupSuccess.emit(res);
        this.amount.set(null);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('فشل إرسال الطلب، يرجى المحاولة مجدداً.');
      }
    });
  }
}
