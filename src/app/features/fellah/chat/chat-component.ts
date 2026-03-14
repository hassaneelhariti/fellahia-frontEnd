import { Component, ElementRef, OnInit, ViewChild, inject, signal, effect } from '@angular/core';
import { ChatMessageResponse } from '../../../core/models/models';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../../core/services/chat-service';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, DatePipe, MarkdownComponent],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  private chatService = inject(ChatService);

  messages = signal<ChatMessageResponse[]>([]);
  inputMessage = signal('');
  loading = signal(false);

  constructor() {
    effect(() => {
      this.messages();
      this.loading();
      setTimeout(() => this.scrollToBottom());
    });
  }

  ngOnInit() {
    this.chatService.getHistory().subscribe(msgs => this.messages.set(msgs));
  }

  private scrollToBottom() {
    const el = this.messagesContainer?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  send() {
    const msg = this.inputMessage().trim();
    if (!msg || this.loading()) return;

    this.inputMessage.set('');
    this.loading.set(true);

    this.messages.update(prev => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: msg, createdAt: new Date().toISOString() }
    ]);

    this.chatService.sendMessage(msg).subscribe({
      next: (res) => {
        this.messages.update(prev => [...prev, res]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  clearHistory() {
    this.chatService.clearHistory().subscribe(() => this.messages.set([]));
  }

  onEnter(event: Event) {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
