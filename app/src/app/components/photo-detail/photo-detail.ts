import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  imports: [DatePipe],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.css',
})
export class PhotoDetail {
  @Input() photo: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() photoSelect = new EventEmitter<string>();
}
