import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LawyerSidebarComponent} from '../lawyer-sidebar-component/lawyer-sidebar-component';

@Component({
  selector: 'app-lawyer-layout-component',
  imports: [
    RouterOutlet,
    LawyerSidebarComponent
  ],
  templateUrl: './lawyer-layout-component.html',
  styleUrl: './lawyer-layout-component.scss',
})
export class LawyerLayoutComponent {

}
