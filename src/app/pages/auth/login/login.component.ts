// src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { LoaderService } from '../../../shared/loader.service';
import { fadeInAnimation } from '../../../animations';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router,private loaderService:LoaderService) {}

  onLogin() {
    this.loaderService.show();
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.auth.setSession(res.token, res.name);
        const slug = localStorage.getItem('slug');
        if (slug) {
          this.router.navigate(['/poll', slug]);
          localStorage.removeItem('slug');
        }else{
           this.router.navigate(['dashboard']);
        }
        this.loaderService.hide();
      },
      error: (err) => {
        console.log(err);
        this.loaderService.show();
        this.error = err.error?.error || 'Login failed';
      }
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      // check navigation state for redirectUrl
      const state = this.router.getCurrentNavigation()?.extras.state as { redirectUrl?: string };

      const redirectTo = state?.redirectUrl || '/dashboard';
      this.router.navigateByUrl(redirectTo);
    } 
  }
}
