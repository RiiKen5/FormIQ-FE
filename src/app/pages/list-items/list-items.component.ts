import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PollCreateComponent } from '../poll-create/poll-create.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environment/environment';
import { LoaderService } from '../../shared/loader.service';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

export interface PollOption {
  _id: string;
  options: string[];
}

export interface Poll {
  _id: string;
  title: string;
  options: PollOption[];
  slug: string;
  owner: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  responseCount: number;
}


@Component({
  selector: 'app-list-items',
  standalone: false,
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss'
})
export class ListItemsComponent {
  category: string = '';

  filters = ['Today', 'Yesterday', 'Last 7 Days', 'Custom'];
  selectedFilters: string[] = [];
  selectedDateRange: { startDate: Date; endDate: Date } | null = null;

  showPagination = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  formItems:Poll[] = [];
  filteredItems:Poll[] = [];
  private destroy$ = new Subject<void>();

  constructor(private loader:LoaderService,private toastr:ToastrService ,private dialog: MatDialog,private http:HttpClient,private location: Location,private route:ActivatedRoute) {
    const category=this.route.snapshot.queryParams['category'];
    this.loader.show();
    this.getAllPolls();
  }

  getAllPolls(){
    this.http.get(`${environment.baseUrl}polls/me`).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.formItems = data;
      this.filteredItems = data;
      this.loader.hide();
    });
  }

  ngOnInit() {
    this.category = this.route.snapshot.queryParams['category'] ?? '';
  }

  ngAfterViewInit() {
    // optional: preload pagination if container is already scrollable
    setTimeout(() => this.checkPaginationVisibility(), 100);
  }

  toggleFilter(filter: string) {
    console.log(filter);
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(filter);
    }
    this.filterItems();
  }

  clearAllFilters() {
    this.selectedFilters = [];
    this.selectedDateRange = null;
    this.filterItems();
  }

  onDateRangeChange(range: any) {
    this.selectedDateRange = range;
    this.filterItems();
  }

  formatSmartDate(date: any): string {
  const m = moment(date);
  const now = moment();

  if (m.isSame(now, 'day')) {
    return `Today at ${m.format('h:mm a')}`;
  } else if (m.isSame(now.clone().add(1, 'day'), 'day')) {
    return `Tomorrow at ${m.format('h:mm a')}`;
  } else {
    return m.format('DD/MM/YYYY h:mm a');
  }
}


  filterItems() {
    if (this.selectedFilters.length === 0) {
      this.filteredItems = [...this.formItems];
      return;
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);

    this.filteredItems = this.formItems.filter((item:any) => {
      const itemDate = new Date(item?.createdAt);
      return this.selectedFilters.some(filter => {
        switch (filter) {
          case 'Today':
            return itemDate.toDateString() === today.toDateString();
          case 'Yesterday':
            return itemDate.toDateString() === yesterday.toDateString();
          case 'Last 7 Days':
            return itemDate >= last7Days;
          case 'Custom':
            if (!this.selectedDateRange) return false;
            return (
              itemDate >= this.selectedDateRange.startDate &&
              itemDate <= this.selectedDateRange.endDate
            );
        }
        return false;
      });
    });
  }

  onScroll(event: any) {
    this.checkPaginationVisibility();
  }

  private checkPaginationVisibility() {
    const element = this.scrollContainer.nativeElement;
    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 20;

    this.showPagination = isNearBottom;
  }

  goBack() {
  this.location.back();
}

deleteItem(item: any) {
  this.http.delete(`${environment.baseUrl}poll/${item?._id}`).pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.formItems = this.formItems.filter((i: any) => i._id !== item._id);
    this.toastr.success('Poll deleted successfully!');
    this.getAllPolls();
  }, (error: any) => {
    console.error('Error deleting item:', error);
    this.toastr.error('Failed to delete item', error);
  });
}

duplicateItem(item: any) {
  this.http.post(`${environment.baseUrl}poll/${item?._id}/duplicate`,{}).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
    this.toastr.success('Poll duplicated successfully!');
    this.getAllPolls();
  });
}

sharePoll(poll: any) {
  const publicUrl = `${window.location.origin}/poll/vote/${poll?.slug}`;
  navigator.clipboard.writeText(publicUrl).then(() => {
    this.toastr.success('Poll link copied to clipboard!');
  }).catch(err => {
    this.toastr.error('Failed to copy link', err);
    console.error(err);
  });
}

openCreatePollDialog(poll: any) {
  const dialogRef = this.dialog.open(PollCreateComponent, {
    width: '600px',
    data: { poll }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log(result);
      this.getAllPolls();
    }
  });
}

ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
