import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TopupService} from '../../../../core/services/topup-service';
import {BalanceResponse} from '../../../../core/models/models';

@Component({
  selector: 'app-credit-card',
  imports: [FormsModule],
  templateUrl: './credit-card-component.html',
  styleUrl: './credit-card-component.scss',
})
export class CreditCardComponent {
  private topupService = inject(TopupService);

  topupSuccess = output<BalanceResponse>();

  cardNumber = signal('');
  expiry = signal('');
  cvv = signal('');
  amount = signal<number | null>(null);
  loading = signal(false);
  error = signal('');

  submit() {
    if (!this.amount() || this.amount()! <= 0) return;
    this.loading.set(true);
    this.error.set('');
    this.topupService.topup({ amount: this.amount()!, method: 'CREDIT_CARD' }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.topupSuccess.emit(res);
        this.resetForm();
      },
      error: () => {
        this.loading.set(false);
        this.error.set('فشلت عملية الشحن، يرجى المحاولة مجدداً.');
      }
    });
  }

  private resetForm() {
    this.cardNumber.set('');
    this.expiry.set('');
    this.cvv.set('');
    this.amount.set(null);
  }
}
