import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading = false;
  constructor(private loader: LoaderService) {
    this.loader.loading$.subscribe(status => {
      this.isLoading = status;
    });
  }
}
