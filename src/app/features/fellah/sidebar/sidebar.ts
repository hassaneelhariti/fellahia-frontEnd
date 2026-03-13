import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {UserStore} from '../../../core/services/UserStore';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  protected store = inject(UserStore);

  ngOnInit() {
    this.store.load();
  }

  protected logout() {
    this.store.logout();
  }
}
