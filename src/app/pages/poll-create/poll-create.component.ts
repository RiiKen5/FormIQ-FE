// src/app/pages/poll-create/poll-create.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-create',
  standalone: false,
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent {
  title = '';
  topic = '';
  questions: any[] = [];
  newQuestion = '';
  useAI = false;
  aiCount = 5;
  options = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  addManualQuestion() {
    if (this.newQuestion.trim()) {
      this.questions.push({ text: this.newQuestion, options: [...this.options] });
      this.newQuestion = '';
    }
  }

  generateAIQuestions() {
    this.loading = true;
    this.http.post<any>('http://localhost:5000/api/ai/generate', {
      topic: this.topic,
      count: this.aiCount
    }).subscribe({
      next: res => {
        this.questions.push(...res.questions);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to generate questions.';
      }
    });
  }

  createPoll() {
    this.http.post('http://localhost:5000/api/polls/create', {
      title: this.title,
      topic: this.topic,
      questions: this.questions
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'Failed to create poll'
    });
  }
}
