import { CommonModule, NgFor, NgIf } from '@angular/common';
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
import { RouterLink } from '@angular/router';

import { CategoryService } from '../../services/category/category.service';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { Category, GetAllCategoriesResponse } from '../../model/category.model';
import { Brand } from '../../model/brand.model';
import { Product } from '../../model/product.model';

const LICENSE_KEY ='eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Njk2NDQ3OTksImp0aSI6ImY1ZWM1ZjBmLTM2NjQtNDVhZS05ODk3LTkxMmJlYjMxYjk1NCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6ImVjMDc2NGQ3In0.DZcxDhL3VW9fblv51FcchomlT3neSubAq3WrXvtSWoHSxYmrV5Ws7HpdQrlQ15276O8_STyYpt9tdMXegs6a3w'

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
  activeTab: string = 'brandList';
  newTag: string = ""; // Holds the value of the new tag input
  tags: string[] = ["Philips"]; // Initial tags
  inventoryStatus: string = 'In Stock';



  // Product Basics
  productName: string = '';
  productDescription: string = '';
  productShortDescription: string = '';
  productSlug: string = '';
  productCode: string = '';
  selectedBrand: string = '';

  // Pricing
  regularPrice: number = 0;
  salePrice: number = 0;
  saleStartDate: string = '';
  saleEndDate: string = '';
  taxStatus: string = '';
  taxClass: string = '';

  // Inventory
  sku: string = '';
  stockManagement: boolean = false;
  stockStatus: string = 'In Stock';
  soldIndividually: boolean = false;

  // Shipping
  length: number = 0;
  width: number = 0;
  height: number = 0;
  weight: number = 0;



  activeBrand: string = ''
  public Editor: typeof ClassicEditor | null = null;
  public config: EditorConfig | null = null;
  categories: Category[] = []; // Store categories
  brands: Brand[] = [];
  newBrand: Brand = {
    _id: '',
    name: '',
    title: '',
    description: '',
    createdAt: '',
    updatedAt: ''
  };

  productSpecifications: { key: string; value: string }[] = [];



  constructor(
    private addProductService: AddProductService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    loadCKEditorCloud(cloudConfig)
      .then(cloud => this._setupEditor(cloud))
      .catch(error => console.error('Error loading CKEditor:', error));
    this.getCategories();
    this.getAllBrands();
  }

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

  // add-product.component.ts

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: GetAllCategoriesResponse) => {
        if (!response || !response.categories || !Array.isArray(response.categories)) {
          console.error('Invalid API response:', response);
          this.categories = [];
          return;
        }

        // Initialize the `selected` property for categories and subcategories
        this.categories = response.categories.map((cat) => ({
          ...cat,
          selected: false, // Initialize `selected` for categories
          subCategories: cat.subCategories?.map((subCat) => ({
            ...subCat,
            selected: false, // Initialize `selected` for subcategories
          })) || [],
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  getAllBrands() {
    this.addProductService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        console.log('Brands loaded:', this.brands);
      },
      error: (error) => {
        console.log("Failed to load brands", error)
      }
    })
  }

  addBrand() {
    if (!this.newBrand.name.trim() || !this.newBrand.title.trim() || !this.newBrand.description.trim()) {
      console.log('All fields are required');
      return;
    }

    this.addProductService.createBrand(this.newBrand).subscribe({
      next: (response) => {
        console.log('Brand added:', response);
        this.newBrand = { _id: '', name: '', title: '', description: '', createdAt: '', updatedAt: '' }; // Reset form
        this.getAllBrands(); // Refresh brand list
      },
      error: (error) => {
        console.log('Failed to add brand', error);
      }
    });
  }

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

  openGalleryModal(): void {
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
  }

  removeImage(imgSrc: string): void {
    this.galleryImages = this.galleryImages.filter((img) => img !== imgSrc);
  }

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

  addNewSpecification() {
    this.productSpecifications.push({ key: "", value: "" });
  }

  deleteSpecification(index: number) {
    this.productSpecifications.splice(index, 1);
  }

  addTag() {
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = ""; // Clear the input field
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  createProduct() {
    const selectedCategoryIds: string[] = [];
    this.categories.forEach((category) => {
      if (category.selected) {
        selectedCategoryIds.push(category._id!);
      }
      if (category.subCategories) {
        category.subCategories.forEach((subCategory) => {
          if (subCategory.selected) {
            selectedCategoryIds.push(subCategory._id);
          }
        });
      }
    });

    const productData: Product = {
      // Product basics
      productName: this.productName,
      productDescription: this.productDescription,
      productShortDescription: this.productShortDescription,
      productSlug: '', // Add actual slug logic
      productCode: '', // Add product code logic
      productBrand: this.selectedBrand,

      // Pricing
      general: {
        regularPrice: this.regularPrice,
        salePrice: this.salePrice,
        taxStatus: '', // Add tax status binding
        taxClass: '' // Add tax class binding
      },

      // Inventory
      inventory: {
        sku: this.sku,
        stockManagement: this.stockManagement,
        stockStatus: this.stockStatus,
        soldIndividually: this.soldIndividually,
        inventoryStatus: 'active'
      },

      // Shipping
      shipping: {
        productDimensions: {
          length: this.length,
          width: this.width,
          height: this.height
        },
        weight: this.weight
      },

      // SEO
      seo: {
        productTitle: this.seoTitle,
        prodDescription: this.seoDescription,
        productTags: this.tags,
        productNotes: ''
      },

      // Media
      productImage: this.featuredImage as string,
      productGallery: this.galleryImages,
      productVideos: [],

      // Metadata
      categoryId: selectedCategoryIds,
      productStatus: 'active',
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      // Specifications
      productSpecification: this.productSpecifications.map(spec => ({
        key: spec.key,
        value: spec.value,
        _id: ''
      })),

      // System fields
      _id: '',
      __v: 0
    };

    this.addProductService.createProduct(productData).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }


}
