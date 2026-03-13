import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessageResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private baseUrl = 'http://localhost:8080/api/fellah/chat';

  constructor(private http: HttpClient) {}

  getHistory() {
    return this.http.get<ChatMessageResponse[]>(`${this.baseUrl}/history`);
  }

  sendMessage(message: string) {
    return this.http.post<ChatMessageResponse>(`${this.baseUrl}/send`, { message });
  }

  clearHistory() {
    return this.http.delete(`${this.baseUrl}/history`);
  }
}
