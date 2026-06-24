import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters implements OnInit {
  private fb = inject(FormBuilder);

  @Output() filterChange = new EventEmitter<any>();

  filterForm: FormGroup = this.fb.group({
    sort: ['relevance'],
    min_upload_date: [''],
    max_upload_date: [''],
    tags: [''],
    size: ['url_m'],
    in_gallery: [false],
    nsfw: [false],
  });

  ngOnInit() {
    this.emitFilters();

    // Écoute des modifications de filautomatiquetres
    this.filterForm.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }

  private emitFilters() {
    const val = this.filterForm.value;

    // API Flickr : 1 = Safe, 3 = Restreint
    const safe = val.nsfw ? 3 : 1;

    this.filterChange.emit({
      sort: val.sort,
      tags: val.tags,
      min_upload_date: val.min_upload_date,
      max_upload_date: val.max_upload_date,
      safe_search: safe,
      in_gallery: val.in_gallery,
      size: val.size,
    });
  }
}
