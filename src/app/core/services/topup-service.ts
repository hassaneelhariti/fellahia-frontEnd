import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BalanceResponse, TopupCodeRequest, TopupRequest, TransactionResponse} from '../models/models';


@Injectable({ providedIn: 'root' })
export class TopupService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/topup';

  getBalance(): Observable<BalanceResponse> {
    return this.http.get<BalanceResponse>(`${this.baseUrl}/balance`);
  }

  topup(request: TopupRequest): Observable<BalanceResponse> {
    return this.http.post<BalanceResponse>(`${this.baseUrl}`, request);
  }

  topupCode(request: TopupCodeRequest): Observable<BalanceResponse> {
    return this.http.post<BalanceResponse>(`${this.baseUrl}/code`, request);
  }


  getTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.baseUrl}/transactions`);
  }
}
