import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-mypolls',
  standalone: false,
  templateUrl: './mypolls.component.html',
  styleUrl: './mypolls.component.scss'
})
export class MypollsComponent {
  polls: any[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient,private loaderSerice:LoaderService) {}

  ngOnInit(): void {
    this.loaderSerice.show();
    this.http.get<any>(`http://localhost:5000/api/polls/mypoll`).subscribe({
      next: (res) => {
        this.polls = res;
        this.loaderSerice.hide();
      },
      error: () => {
        this.loaderSerice.hide();

      }
    });
  }
}
