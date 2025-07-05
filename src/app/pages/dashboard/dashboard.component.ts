// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CONTENT_CATEGORIES } from '../../constant';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  userName = '';
  recents = CONTENT_CATEGORIES;


  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(u => this.userName = u || '');
  }

  logout() {
    this.auth.logout();
  }
}
