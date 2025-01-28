import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  featuredImage: string | ArrayBuffer | null = '';
  galleryImages: string[] = [];
  isGalleryModalOpen: boolean = false;


  ngOnInit() {
  }


  constructor() {
  }


  // Handle Featured Image Upload
  onFeaturedImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.featuredImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle Multiple Image Uploads
  onGalleryImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.galleryImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Open & Close Modal
  openGalleryModal(): void {
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
  }

  // Remove an Image
  removeImage(imgSrc: string): void {
    this.galleryImages = this.galleryImages.filter(img => img !== imgSrc);
  }

}
