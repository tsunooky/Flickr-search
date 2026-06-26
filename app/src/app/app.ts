import { Component, inject, signal, HostListener } from '@angular/core';
import { SearchBar } from './components/search-bar/search-bar';
import { Filters } from './components/filters/filters';
import { Results } from './components/results/results';
import { PhotoDetail } from './components/photo-detail/photo-detail';
import { FlickrService } from './services/flickr.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBar, Filters, Results, PhotoDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private flickrService = inject(FlickrService);

  photos = signal<any[]>([]);
  currentSize = signal<string>('url_m');
  loading = signal<boolean>(false);
  loadingDetails = signal<boolean>(false);
  errorMsg = signal<string>('');
  selectedPhotoDetail = signal<any>(null);

  searchQuery = signal<string>('');
  activeFilters = signal<any>({});

  // Barre de recherche
  onSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.triggerSearch();
  }

  // Déclenché au changement de filtres
  onFiltersChange(filters: any) {
    this.activeFilters.set(filters);
    if (this.searchQuery() && this.searchQuery().trim() !== '') {
      this.triggerSearch();
    }
  }

  // Recherche de photos
  triggerSearch() {
    this.loading.set(true);
    this.errorMsg.set('');
    this.currentSize.set(this.activeFilters().size || 'url_m');

    const searchParams = {
      text: this.searchQuery(),
      ...this.activeFilters(),
    };

    this.flickrService.searchPhotos(searchParams).subscribe({
      next: (res: any) => {
        if (res && res.stat === 'fail') {
          this.errorMsg.set(res.message || 'Clé API expirée ou invalide.');
          this.photos.set([]);
        } else if (res && res.photos && res.photos.photo) {
          this.photos.set(res.photos.photo);
          if (this.photos().length === 0) {
            this.errorMsg.set('Aucune photo trouvée.');
          }
        }
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('Erreur de recherche. Veuillez vérifier votre clé API ou connexion.');
        this.loading.set(false);
      },
    });
  }

  // Clic sur une photo : charge les infos, commentaires et photos de l'auteur
  onPhotoClick(photo: any) {
    this.loadingDetails.set(true);
    this.selectedPhotoDetail.set(null);

    forkJoin({
      info: this.flickrService.getPhotoDetails(photo.id),
      comments: this.flickrService.getPhotoComments(photo.id),
      authorPhotos: this.flickrService.searchPhotos({ user_id: photo.owner }),
    }).subscribe({
      next: (res: any) => {
        const infoObj = res.info?.photo;
        if (infoObj) {
          infoObj.url_s =
            photo.url_s ||
            `https://live.staticflickr.com/${infoObj.server}/${infoObj.id}_${infoObj.secret}_q.jpg`;
          infoObj.url_m =
            photo.url_m ||
            `https://live.staticflickr.com/${infoObj.server}/${infoObj.id}_${infoObj.secret}.jpg`;
          infoObj.url_l =
            photo.url_l ||
            `https://live.staticflickr.com/${infoObj.server}/${infoObj.id}_${infoObj.secret}_b.jpg`;
        }

        this.selectedPhotoDetail.set({
          info: infoObj,
          comments: res.comments?.comments?.comment || [],
          location: infoObj?.location || null,
          authorPhotos: res.authorPhotos?.photos?.photo || [],
        });
        this.loadingDetails.set(false);
      },
      error: () => {
        this.errorMsg.set('Erreur lors du chargement des détails de la photo.');
        this.loadingDetails.set(false);
      },
    });
  }

  // Fermeture des détails
  onCloseDetails() {
    this.selectedPhotoDetail.set(null);
  }

  // Rechargement des détails pour une autre photo de l'auteur
  onPhotoSelectInDetails(photoId: string) {
    const ownerId =
      this.selectedPhotoDetail().info.owner.nsid || this.selectedPhotoDetail().info.owner.id;
    this.onPhotoClick({ id: photoId, owner: ownerId });
  }

  // Navigation entre les photos (gauche/droite)
  navigatePhoto(direction: number) {
    if (!this.selectedPhotoDetail() || this.photos().length === 0) return;
    const currentId = this.selectedPhotoDetail().info.id;
    const index = this.photos().findIndex((p) => p.id === currentId);
    if (index === -1) return;

    let newIndex = index + direction;
    if (newIndex >= this.photos().length) newIndex = 0;
    if (newIndex < 0) newIndex = this.photos().length - 1;

    this.onPhotoClick(this.photos()[newIndex]);
  }

  // Gestion des raccourcis clavier
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.selectedPhotoDetail()) return;
    if (event.key === 'ArrowRight') {
      this.navigatePhoto(1);
    } else if (event.key === 'ArrowLeft') {
      this.navigatePhoto(-1);
    } else if (event.key === 'Escape') {
      this.onCloseDetails();
    }
  }
}
