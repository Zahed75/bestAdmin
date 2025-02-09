import { CommonModule, NgFor, NgIf} from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  loadCKEditorCloud,
  CKEditorModule,
  type CKEditorCloudResult,
  type CKEditorCloudConfig,
} from '@ckeditor/ckeditor5-angular';

import type {
  ClassicEditor,
  EditorConfig,
} from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import {RouterLink} from '@angular/router';

import {AddProductService} from '../../services/addProduct/add-product.service';
import {CategoriesListComponent} from '../categories-list/categories-list.component';
import {CategoryUI} from '../categories-list/categories-list.component';
import {CategoryService} from '../../services/category/category.service';
import {Category, GetAllCategoriesResponse} from '../../model/category.model';


const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Njk2NDQ3OTksImp0aSI6IjliY2M4ODM1LTc3ZjMtNDMwOC1hZjIxLTgzYzQxNGNmOTc5OCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiMmM0MmQ2ZDIifQ.TkcaS4YFgY77J7GHhjKgr5PsHSsWbPMPRAdrIj8zrhoa1bdoUEW9aSdfIS6AM4Dq0x9DUz_aBw5Uyk8txwfrlw';

const CLOUD_SERVICES_TOKEN_URL =
  'https://t9cw67u3pmtj.cke-cs.com/token/dev/52636a8ca1c4ef819003d04298b00555dd27545c215f07c4b219ba398ed8?limit=10';

const cloudConfig = {
  version: '44.1.0',
  ckbox: {
    version: '2.6.1',
  },
  premium: true,
} satisfies CKEditorCloudConfig;



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CKEditorModule,
    NgIf,
    NgFor,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  encapsulation: ViewEncapsulation.None
})




export class AddProductComponent implements OnInit {
  featuredImage: string | ArrayBuffer | null = '';
  galleryImages: string[] = [];
  isGalleryModalOpen: boolean = false;
  seoTitle: string = '';
  seoDescription: string = '';
  seoThumbnail: string | ArrayBuffer | null = '';
  seoTitleFeedback: string = 'gray'; // gray, green, yellow, red
  seoDescriptionFeedback: string = 'gray'; // gray, green, yellow, red
  activeTab: string = 'general';
  weight: number = 0;
  length: number = 0;
  width: number = 0;
  height: number = 0;
  newTag: string = ""; // Holds the value of the new tag input
  tags: string[] = ["Philips"]; // Initial tags
  newBrand: string = ""; // Holds the value of the new brand input
  brands: string[] = ["Philips", "Samsung", "LG"]; // Initial brands
  activeBrand:string =''
  public Editor: typeof ClassicEditor | null = null;
	public config: EditorConfig | null = null;
  categories: Category[] = []; // Store categories



	private _setupEditor(cloud: CKEditorCloudResult<typeof cloudConfig>) {
		const {
			ClassicEditor,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			CKBox,
			CKBoxImageEdit,
			CloudServices,
			Essentials,
			Heading,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			Paragraph,
			PictureEditing,
			SpecialCharacters,
			TodoList,
			Underline
		} = cloud.CKEditor;


		this.Editor = ClassicEditor;
		this.config = {
			toolbar: {
				items: [
					'heading',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'specialCharacters',
					'link',
					'insertImage',
					'ckbox',
					'blockQuote',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AutoImage,
				Autosave,
				BlockQuote,
				Bold,
				CKBox,
				CKBoxImageEdit,
				CloudServices,
				Essentials,
				Heading,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				Paragraph,
				PictureEditing,
				SpecialCharacters,
				TodoList,
				Underline
			],
			cloudServices: {
				tokenUrl: CLOUD_SERVICES_TOKEN_URL
			},
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'imageStyle:inline',
					'imageStyle:wrapText',
					'imageStyle:breakText',
					'|',
					'resizeImage',
					'|',
					'ckboxImageEdit'
				]
			},
			initialData:
				'<h2>Write the Product Desc..</h2>',
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},

			placeholder: 'Type or paste your content here!'
		};


	}




  constructor(
    private addProductService: AddProductService,
    private categoryService: CategoryService
  ) {}


  ngOnInit() {
    loadCKEditorCloud(cloudConfig)
      .then(cloud => this._setupEditor(cloud))
      .catch(error => console.error('Error loading CKEditor:', error));
      this.getCategories();
  }


  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: GetAllCategoriesResponse) => {
        if (!response || !response.categories || !Array.isArray(response.categories)) {
          console.error('Invalid API response:', response);
          this.categories = [];
          return;
        }

        this.categories = response.categories.map((cat) => ({
          ...cat,
          subCategories: cat.subCategories ?? [] // Ensure subCategories is always an array
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
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
    this.galleryImages = this.galleryImages.filter((img) => img !== imgSrc);
  }

 // Method to analyze SEO Title
 analyzeSeoTitle(): void {
    const length = this.seoTitle.length;
    if (length === 0) {
      this.seoTitleFeedback = 'gray';
    } else if (length > 0 && length <= 50) {
      this.seoTitleFeedback = 'green';
    } else if (length > 50 && length <= 60) {
      this.seoTitleFeedback = 'yellow';
    } else {
      this.seoTitleFeedback = 'red';
    }
  }

  // Method to analyze SEO Description
  analyzeSeoDescription(): void {
    const length = this.seoDescription.length;
    if (length === 0) {
      this.seoDescriptionFeedback = 'gray';
    } else if (length > 0 && length <= 150) {
      this.seoDescriptionFeedback = 'green';
    } else if (length > 150 && length <= 160) {
      this.seoDescriptionFeedback = 'yellow';
    } else {
      this.seoDescriptionFeedback = 'red';
    }
  }

  // Call these methods when the input changes
  onSeoTitleChange(): void {
    this.analyzeSeoTitle();
  }

  onSeoDescriptionChange(): void {
    this.analyzeSeoDescription();
  }

  onThumbnailChange(event: Event): void {
	const input = event.target as HTMLInputElement;
	if (input.files && input.files.length > 0) {
	  const file = input.files[0];
	  const reader = new FileReader();
	  reader.onload = () => {
		this.seoThumbnail = reader.result;
	  };
	  reader.readAsDataURL(file);
	}
  }

  productSpecifications: { key: string; value: string }[] = [

  ];

  addNewSpecification() {
    this.productSpecifications.push({ key: "", value: "" });
  }

   // Delete a specification row
   deleteSpecification(index: number) {
    this.productSpecifications.splice(index, 1);
  }

  addTag() {
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = ""; // Clear the input field
    }
  }


  // Remove a tag
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }


  addBrand() {
    if (this.newBrand.trim() && !this.brands.includes(this.newBrand.trim())) {
      this.brands.push(this.newBrand.trim());
      this.newBrand = ""; // Clear the input field
      this.activeBrand = "brandList"; // Switch back to the Brand List tab
    }
  }






}



