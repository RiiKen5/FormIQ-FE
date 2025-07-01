// src/app/pages/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (res) => {
        this.auth.setSession(res.token, res.name);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed';
      }
    });
  }
}
