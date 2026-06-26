import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [DatePipe],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  @Input() photos: any[] = [];
  @Input() size: string = 'url_m';
  @Output() photoClick = new EventEmitter<any>();
}
