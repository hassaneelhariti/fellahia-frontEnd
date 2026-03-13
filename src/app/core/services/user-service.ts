import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfileResponse, TransactionResponse, BalanceResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users/me';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<UserProfileResponse>(this.baseUrl);
  }

  getBalance() {
    return this.http.get<BalanceResponse>(`${this.baseUrl}/balance`);
  }

  getTransactions() {
    return this.http.get<TransactionResponse[]>(`${this.baseUrl}/transactions`);
  }
}
