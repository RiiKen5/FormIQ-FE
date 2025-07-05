// src/app/pages/poll-view/poll-view.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-poll-view',
  standalone: false,
  templateUrl: './poll-view.component.html'
})
export class PollViewComponent implements OnInit {
  poll: any;
  answers: { [key: string]: string } = {};
  submitted = false;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.http.get(`${environment.baseUrl}polls/${slug}`).subscribe({
      next: (res: any) => {
        this.poll = res;
        const userId = this.auth.getUserId(); // make sure AuthService supports this
        this.isOwner = res.owner === userId;
        this.submitted = res?.alreadySubmitted || false;
      },
      error: (err) => {
        console.error('Error fetching poll:', err);
        localStorage.setItem('slug', slug || '');
        this.router.navigate(['/login']);
      }
    });
  }

  submit() {
    const payload = {
      answers: Object.entries(this.answers).map(([questionId, value]) => ({
        questionId,
        value
      }))
    };

    this.http.post(`${environment.baseUrl}polls/${this.poll.pollId}/response`, payload).subscribe({
      next: () => {
        this.submitted = true;
      }
    });
  }
}
