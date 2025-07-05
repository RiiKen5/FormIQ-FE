import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading = false;
  isAuthenticated = false;
  constructor(private loader: LoaderService, private auth: AuthService) {
    this.loader.loading$.subscribe(status => {
      this.isLoading = status;
    });

    this.isAuthenticated = this.auth.isAuthenticated();
  }
}
