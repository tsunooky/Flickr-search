import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlickrService } from '../../services/flickr.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule]
  //templateUrl: './filters.component.html'
})
export class FiltersComponent {
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private flickrService: FlickrService) {
    this.filterForm = this.fb.group({
      text: [''],
      sort: ['relevance'],
      min_upload_date: [''],
      max_upload_date: [''],
      tags: ['']
    });
  }

  onSubmit() {
    this.flickrService.searchPhotos(this.filterForm.value).subscribe(res => {
      console.log('Photos trouvées', res);
    });
  }
}