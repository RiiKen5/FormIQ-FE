import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private http:HttpClient,private route: ActivatedRoute) {}

  ngOnInit() {
    this.slugId = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:5000/api/poll/'+this.slugId).subscribe((data: any) => {
      this.poll = data;
    });
  }

  submitVote(pollToUpdate: any) {
    if (this.selectedIndex === null) {
      alert('Please select an option.');
      return;
    }
    if (pollToUpdate) {
      this.http.post('http://localhost:5000/api/poll/vote',{
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
}
