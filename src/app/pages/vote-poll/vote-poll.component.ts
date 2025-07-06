import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment/environment';
import { LoaderService } from '../../shared/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vote-poll',
  standalone: false,
  styleUrls: ['./vote-poll.component.scss'],
  templateUrl: './vote-poll.component.html'
})
export class VotePollComponent implements OnInit {
  poll: any;
  selectedIndex: number | null = null;
  slugId: any;
  private destroy$ = new Subject<void>();

  constructor(private loader:LoaderService,private http:HttpClient,private route: ActivatedRoute) {}

  ngOnInit() {
    this.slugId = this.route.snapshot.paramMap.get('id');
    this.loader.show();
    this.http.get(`${environment.baseUrl}poll/`+this.slugId).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.poll = data;
      this.loader.hide();
    }, (error: any) => {
      console.error('Error fetching poll:', error);
      this.loader.hide();
    });
  }

  submitVote(pollToUpdate: any) {
    if (this.selectedIndex === null) {
      alert('Please select an option.');
      return;
    }
    if (pollToUpdate) {
      this.http.post(`${environment.baseUrl}poll/vote`,{
        option: this.selectedIndex,
        pollId: pollToUpdate._id,
      }).subscribe((response: any) => {
        console.log('Vote submitted successfully:', response);
        window.location.reload();
      }, (error: any) => {
        console.error('Error submitting vote:', error);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
