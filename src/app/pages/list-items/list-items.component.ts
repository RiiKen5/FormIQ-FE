import {
  Component,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../shared/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { PollCreateComponent } from '../poll-create/poll-create.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr:ToastrService ,private dialog: MatDialog,private modalService:ModalService,private http:HttpClient,private location: Location,private route:ActivatedRoute) {
    const category=this.route.snapshot.queryParams['category']
    this.http.get('http://localhost:5000/api/polls/me').subscribe((data: any) => {
      this.formItems = data;
      this.filteredItems = data;
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
  this.http.delete(`http://localhost:5000/api/poll/${item?._id}`).subscribe(() => {
    this.formItems = this.formItems.filter((i: any) => i._id !== item._id);
    this.toastr.success('Poll deleted successfully!');
    this.filterItems();
  }, (error: any) => {
    console.error('Error deleting item:', error);
    this.toastr.error('Failed to delete item', error);
  });
}

duplicateItem(item: any) {
  this.http.post(`http://localhost:5000/api/poll/${item?._id}/duplicate`,{}).subscribe((data: any) => {
    this.formItems.push(data);
    this.toastr.success('Poll duplicated successfully!');
    this.filterItems();
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
      if (result._id) {
        const index = this.formItems?.findIndex((item: any) => item._id === result._id);
        if (index >= 0) {
          this.formItems[index] = result;
        }
      }
      this.filterItems();
    }
  });
}

}
