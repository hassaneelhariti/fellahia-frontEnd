import { Component, OnInit, signal, inject } from '@angular/core';
import {BalanceResponse} from '../../../../core/models/models';
import {TopupService} from '../../../../core/services/topup-service';
import {CreditCardComponent} from '../credit-card-component/credit-card-component';
import {BankTransferComponent} from '../bank-transfer-component/bank-transfer-component';
import {RechargeCodeComponent} from '../recharge-code-component/recharge-code-component';
import {DecimalPipe} from '@angular/common';


type Tab = 'cc' | 'bt' | 'rc';

@Component({
  selector: 'app-topup',
  imports: [CreditCardComponent, BankTransferComponent, RechargeCodeComponent, DecimalPipe],
  templateUrl: './topup-component.html',
  styleUrl: './topup-component.scss',
})
export class TopupComponent implements OnInit {
  private topupService = inject(TopupService);

  activeTab = signal<Tab>('cc');
  balance = signal<number>(0);

  ngOnInit() {
    this.loadBalance();
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  loadBalance() {
    this.topupService.getBalance().subscribe({
      next: (res) => this.balance.set(res.balance),
      error: (err) => console.error('Failed to load balance', err)
    });
  }

  onTopupSuccess(res: BalanceResponse) {
    this.balance.set(res.balance);
  }
}
