import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: false,
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {
@Input() message = 'Oops! No data found.';
}
