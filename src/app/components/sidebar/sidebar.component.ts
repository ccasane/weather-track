import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private sharedService: SharedService) {}

  searchCity(city: string): void {
    if (city.trim()) {
      this.sharedService.setCity(city);
    }
  }
}
