import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CaseSubmitRequest, LegalCaseResponse, PageLegalCaseResponse, Pageable } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CaseService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Fellah
  getMyCases(pageable: Pageable) {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size);
    return this.http.get<PageLegalCaseResponse>(`${this.baseUrl}/fellah/cases`, { params });
  }

  submitCase(data: CaseSubmitRequest, files?: File[]) {
    const form = new FormData();
    form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (files) files.forEach(f => form.append('files', f));
    return this.http.post<LegalCaseResponse>(`${this.baseUrl}/fellah/cases`, form);
  }

  getCase(id: string) {
    return this.http.get<LegalCaseResponse>(`${this.baseUrl}/fellah/cases/${id}`);
  }

  // Lawyer
  getPendingCases(pageable: Pageable) {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size);
    return this.http.get<PageLegalCaseResponse>(`${this.baseUrl}/lawyer/cases/pending`, { params });
  }

  getLawyerCases(pageable: Pageable) {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size);
    return this.http.get<PageLegalCaseResponse>(`${this.baseUrl}/lawyer/cases/my`, { params });
  }

  acceptCase(id: string) {
    return this.http.post<LegalCaseResponse>(`${this.baseUrl}/lawyer/cases/${id}/accept`, {});
  }

  getLawyerDashboard() {
    return this.http.get<any>(`${this.baseUrl}/lawyer/dashboard`);
  }
}
