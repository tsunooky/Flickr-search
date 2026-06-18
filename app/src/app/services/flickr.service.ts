import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { environment } from '../../environments/environment';

export interface FlickrFilters {
  text?: string;
  sort?: string;
  tags?: string;
  min_upload_date?: string;
  max_upload_date?: string;
  safe_search?: number; 
  in_gallery?: boolean;
}

@Injectable({ providedIn: 'root' })
export class FlickrService {
  private readonly API_URL = 'https://api.flickr.com/services/rest';
  private readonly API_KEY = "";
  private http = inject(HttpClient);

  searchPhotos(filters: FlickrFilters): Observable<any> {
    let params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('api_key', this.API_KEY)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('extras', 'url_m,owner_name,date_upload'); 

    
    if (filters.text) 
    {
        params = params.set('text', filters.text);
    }
    if (filters.sort) 
    {
        params = params.set('sort', filters.sort);
    }
    if (filters.tags) 
    {
        params = params.set('tags', filters.tags);
    }
    if (filters.min_upload_date) 
    {
        params = params.set('min_upload_date', this.toUnix(filters.min_upload_date));
    }
    if (filters.max_upload_date) 
    {
        params = params.set('max_upload_date', this.toUnix(filters.max_upload_date));
    }
    
    if (filters.safe_search) 
    {
        params = params.set('safe_search', filters.safe_search.toString());
    }
    if (filters.in_gallery) 
    {
        params = params.set('in_gallery', '1');
    }

    return this.http.get(this.API_URL, { params }).pipe(
      catchError(error => {
        console.error('Erreur lors de l’appel API Flickr', error);
        return throwError(() => new Error('Service Flickr indisponible.'));
      })
    );
  }

  private toUnix(date: string): string {
    return Math.floor(new Date(date).getTime() / 1000).toString();
  }
}