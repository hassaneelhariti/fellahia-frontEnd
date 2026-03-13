import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatMessageResponse} from '../../../core/models/models';
import {ChatService} from '../../../core/services/chat-service';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-component',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  messages: ChatMessageResponse[] = [];
  inputMessage = '';
  loading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getHistory().subscribe(msgs => this.messages = msgs);
  }

  ngAfterViewChecked() {
    const el = this.messagesContainer?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  send() {
    const msg = this.inputMessage.trim();
    if (!msg || this.loading) return;
    this.inputMessage = '';
    this.loading = true;
    this.messages.push({ id: '', role: 'user', content: msg, createdAt: new Date().toISOString() });
    this.chatService.sendMessage(msg).subscribe({
      next: (res) => { this.messages.push(res); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  clearHistory() {
    this.chatService.clearHistory().subscribe(() => this.messages = []);
  }

  onEnter(event: Event) {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
