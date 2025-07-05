import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-poll-create',
  standalone: false,
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {
  pollTitle = '';
  pollOptions: string[] = ['', ''];
  category: string;
  mode: 'create' | 'edit' = 'create';
  pollId?: string;

  constructor(
    private http: HttpClient,
    private toast:ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<PollCreateComponent>
  ) {
    this.category = route.snapshot.queryParams['category'] || '';
  }

  ngOnInit(): void {
    if (this.data?.poll) {
      console.log(this.data);
      const poll = this.data.poll;
      this.mode = 'edit';
      this.pollId = poll._id;
      this.pollTitle = poll.title;
      this.pollOptions = poll.options[0]?.options || ['', ''];
    }
  }

  goBack() {
    this.dialogRef.close(); // if opened as modal
  }

  onOptionChange(index: number) {
    const val = this.pollOptions[index].trim();
    if (index === this.pollOptions.length - 1 && val !== '') {
      this.pollOptions.push('');
    }
    this.pollOptions = this.pollOptions.filter((opt, i, arr) =>
      opt.trim() !== '' || i >= arr.length - 2
    );
  }

  submitPoll() {
    const cleaned = this.pollOptions.map(opt => opt.trim()).filter(opt => opt);
    if (!this.pollTitle.trim() || cleaned.length < 2) {
      alert('Please enter a poll title and at least 2 options.');
      return;
    }

    const pollPayload = {
      title: this.pollTitle.trim(),
      options: { options: cleaned }
    };

    if (this.mode === 'edit' && this.pollId) {
      // Update API call
      this.http.put(`${environment.baseUrl}poll/${this.pollId}`, pollPayload).subscribe((data: any) => {
        console.log('Poll updated:', data);
        this.toast.success('Poll updated successfully!');
        this.dialogRef.close(data);
      });
    } else {
      // Create new poll
      this.http.post(`${environment.baseUrl}poll`, pollPayload).subscribe((data: any) => {
        console.log('Poll created:', data);
        this.toast.success('Poll created successfully!');
        this.router.navigate(['/list-items'], { queryParams: { category: this.category } });
      });
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
