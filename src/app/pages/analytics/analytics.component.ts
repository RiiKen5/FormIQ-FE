// src/app/pages/analytics/analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  pollId!: string;
  questionId!: string;
  responses: any[] = [];
  counts: Record<string, number> = {};
  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.pollId = this.route.snapshot.paramMap.get('pollId')!;
    this.questionId = this.route.snapshot.paramMap.get('questionId')!;

    this.http.get<any[]>(`http://localhost:5000/api/polls/${this.pollId}/responses`).subscribe(data => {
      this.responses = data;

      const answers = data.map(r => r.answers.find((a: any) => a.questionId === this.questionId));
      for (const answer of answers) {
        if (!answer) continue;
        this.counts[answer.value] = (this.counts[answer.value] || 0) + 1;
      }
    });
  }
}
