import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-fellah-layout-component',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './fellah-layout-component.html',
  styleUrl: './fellah-layout-component.scss',
})
export class FellahLayoutComponent {}
