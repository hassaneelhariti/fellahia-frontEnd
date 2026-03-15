import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BalanceResponse} from '../../../../core/models/models';
import {TopupService} from '../../../../core/services/topup-service';

@Component({
  selector: 'app-recharge-code',
  imports: [FormsModule],
  templateUrl: './recharge-code-component.html',
  styleUrl: './recharge-code-component.scss',
})
export class RechargeCodeComponent {
  private topupService = inject(TopupService);

  topupSuccess = output<BalanceResponse>();

  code = signal('');
  loading = signal(false);
  error = signal('');

  submit() {
    if (this.code().length !== 7) return;
    this.loading.set(true);
    this.error.set('');
    this.topupService.topupCode({ code: this.code(),method: 'RECHARGE_CODE_' }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.topupSuccess.emit(res);
        this.code.set('');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('الكود غير صحيح أو منتهي الصلاحية.');
      }
    });
  }
}
