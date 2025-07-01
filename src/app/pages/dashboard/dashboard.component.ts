// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  userName = '';
  recents = [
    { label: 'Forms', icon: 'bi bi-file-earmark-text' },
    { label: 'Polls', icon: 'bi bi-ui-checks' },
    { label: 'Surveys', icon: 'bi bi-journal-check' },
    { label: 'Quizzes', icon: 'bi bi-clipboard-check' },
    { label: 'Live', icon: 'bi bi-broadcast' },
  ];

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(u => this.userName = u || '');
  }

  logout() {
    this.auth.logout();
  }
}
