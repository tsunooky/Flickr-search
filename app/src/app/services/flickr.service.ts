import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface FlickrFilters {
  text?: string;
  sort?: string;
  tags?: string;
  min_upload_date?: string;
  max_upload_date?: string;
  safe_search?: number;
  in_gallery?: boolean;
  user_id?: string;
}

@Injectable({ providedIn: 'root' })
export class FlickrService {
  /* ---------------------------------------------------------- */
  /* ----------------- CHANGER LA CLÉ API ICI ----------------- */
  /* ---------------------------------------------------------- */
  private readonly API_KEY = '53b313aee256ada9cd41b57258f2d78f';

  private readonly API_URL = 'https://api.flickr.com/services/rest';

  private http = inject(HttpClient);

  // Recherche des photos sur Flickr
  searchPhotos(filters: FlickrFilters) {
    let params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('api_key', this.API_KEY)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('extras', 'url_s,url_m,url_l,owner_name,date_upload');

    if (filters.text) params = params.set('text', filters.text);
    if (filters.sort) params = params.set('sort', filters.sort);
    if (filters.tags) params = params.set('tags', filters.tags);
    if (filters.min_upload_date)
      params = params.set('min_upload_date', this.toUnix(filters.min_upload_date));
    if (filters.max_upload_date)
      params = params.set('max_upload_date', this.toUnix(filters.max_upload_date));
    if (filters.safe_search) params = params.set('safe_search', filters.safe_search.toString());
    if (filters.in_gallery) params = params.set('in_gallery', '1');
    if (filters.user_id) params = params.set('user_id', filters.user_id);

    return this.http.get(this.API_URL, { params }).pipe(
      catchError((error) => {
        console.error('Flickr Search error:', error);
        return throwError(() => new Error('Service de recherche Flickr indisponible.'));
      }),
    );
  }

  // Récupère les infos d'une photo
  getPhotoDetails(photoId: string) {
    const params = new HttpParams()
      .set('method', 'flickr.photos.getInfo')
      .set('api_key', this.API_KEY)
      .set('photo_id', photoId)
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http.get(this.API_URL, { params }).pipe(
      catchError((e) => {
        console.error('Flickr GetInfo error:', e);
        return throwError(() => new Error('Impossible de charger les données.'));
      }),
    );
  }

  // Récupère les commentaires d'une photo
  getPhotoComments(photoId: string) {
    const params = new HttpParams()
      .set('method', 'flickr.photos.comments.getList')
      .set('api_key', this.API_KEY)
      .set('photo_id', photoId)
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http.get(this.API_URL, { params }).pipe(
      catchError((error) => {
        console.error('Flickr Comments error:', error);
        return throwError(() => new Error('Impossible de récupérer les commentaires.'));
      }),
    );
  }

  // Convertit une date YYYY-MM-DD en Unix Timestamp
  private toUnix(date: string): string {
    return Math.floor(new Date(date).getTime() / 1000).toString();
  }
}
