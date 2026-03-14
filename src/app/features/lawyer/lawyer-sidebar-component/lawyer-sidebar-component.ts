import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '../../../core/services/UserStore';

@Component({
  selector: 'app-lawyer-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './lawyer-sidebar-component.html',
  styleUrl: './lawyer-sidebar-component.scss',
})
export class LawyerSidebarComponent implements OnInit {
  protected store = inject(UserStore);
  profile = this.store.profile;

  ngOnInit() {
    this.store.load();
  }

  protected logout() {
    this.store.logout();
  }
}
