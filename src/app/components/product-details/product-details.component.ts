import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/product/products.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgClass, NgFor, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {
  type CKEditorCloudConfig,
  type CKEditorCloudResult,
  CKEditorModule,
  loadCKEditorCloud
} from '@ckeditor/ckeditor5-angular';
import {Category, GetAllCategoriesResponse} from '../../model/category.model';
import {Product} from '../../model/product.model';
import {CategoryService} from '../../services/category/category.service';
import {AddProductService} from '../../services/addProduct/add-product.service';
import {Brand} from '../../model/brand.model';
import type {ClassicEditor, EditorConfig} from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';

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
  selector: 'app-product-details',
  imports: [
    FormsModule,
    CKEditorModule,
    NgIf,
    NgFor,
    NgClass,
    RouterLink,
    CommonModule,

  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{


  constructor(
    private ProductService:ProductsService,
    private categoryService:CategoryService,
    private addProductService:AddProductService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {

  }

  productId: string = '';
  productName: string = '';
  productDescription: string = '';
  productShortDescription: string = '';
  productSlug: string = '';
  productCode: string = '';
  selectedBrand: string = '';
  regularPrice: number = 0;
  salePrice: number = 0;
  saleStartDate: string = '';
  saleEndDate: string = '';
  taxStatus: string = '';
  taxClass: string = '';
  sku: string = '';
  stockManagement: boolean = false;
  stockStatus: string = 'In Stock';
  soldIndividually: boolean = false;
  length: number = 0;
  width: number = 0;
  height: number = 0;
  weight: number = 0;
  seoTitle: string = '';
  seoDescription: string = '';
  seoThumbnail: string | ArrayBuffer | null = '';
  featuredImage: string | ArrayBuffer | null = '';
  galleryImages: string[] = [];
  tags: string[] = [];
  productSpecifications: { key: string; value: string }[] = [];
  categories: any[] = []; // Replace with your Category model
  brands: any[] = []; // Replace with your Brand model
  activeTab: string = 'brandList';
  product: Product | null = null;
  isGalleryModalOpen: boolean = false;

  seoTitleFeedback: string = 'gray';
  seoDescriptionFeedback: string = 'gray';

  newTag: string = "";

  inventoryStatus: string = '';
  productStatus:string=''

  newBrand: Brand = {
    _id: '',
    name: '',
    title: '',
    description: '',
    createdAt: '',
    updatedAt: ''
  };





  // Ck EDITOR SETUP
  public Editor: typeof ClassicEditor | null = null;
  public config: EditorConfig | null = null;
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


  ngOnInit() {
    loadCKEditorCloud(cloudConfig)
      .then(cloud => this._setupEditor(cloud))
      .catch(error => console.error('Error loading CKEditor:', error));

    // Get the productId from the route
    this.productId = this.route.snapshot.paramMap.get('productId') || '';

    if(this.productId){
      // Fetch product details
      this.getProductDetails(this.productId);
      this.getAllBrands();
      this.getCategories();
    }

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.categories;
    });

  }





  // add-product.component.ts


  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: GetAllCategoriesResponse) => {
        if (!response || !response.categories || !Array.isArray(response.categories)) {
          console.error('Invalid API response:', response);
          this.categories = []; // Initialize as an empty array
          return;
        }

        // Initialize the `selected` property for categories and subcategories
        this.categories = response.categories.map((cat) => ({
          ...cat,
          selected: this.product?.categoryId?.includes(cat._id as string) || false, // Use type assertion
          subCategories: cat.subCategories?.map((subCat) => ({
            ...subCat,
            selected: this.product?.categoryId?.includes(subCat._id as string) || false, // Use type assertion
          })) || [],
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.categories = []; // Initialize as an empty array in case of error
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


  getProductDetails(productId: string): void {
    this.ProductService.getProductById(productId).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response

        // Extract the product data from the `data` property
        const productData = response.data;

        // Map the product data to the Product model
        const product: Product = {
          productName: productData.productName,
          productDescription: productData.productDescription,
          productShortDescription: productData.productShortDescription,
          productSlug: productData.productSlug,
          productCode: productData.productCode,
          productBrand: productData.productBrand,
          general: {
            regularPrice: productData.general?.regularPrice || 0,
            salePrice: productData.general?.salePrice || 0,
            taxStatus: productData.general?.taxStatus || '',
            taxClass: productData.general?.taxClass || ''
          },
          inventory: {
            sku: productData.inventory?.sku || '',
            stockManagement: productData.inventory?.stockManagement || false,
            stockStatus: productData.inventory?.stockStatus || 'In Stock',
            soldIndividually: productData.inventory?.soldIndividually || false,
            inventoryStatus: productData.inventory?.inventoryStatus || ''
          },
          shipping: {
            productDimensions: {
              length: productData.shipping?.productDimensions?.length || 0,
              width: productData.shipping?.productDimensions?.width || 0,
              height: productData.shipping?.productDimensions?.height || 0
            },
            weight: productData.shipping?.weight || 0
          },
          seo: {
            productTitle: productData.seo?.productTitle || '',
            prodDescription: productData.seo?.prodDescription || '',
            productTags: productData.seo?.productTags || [],
            productNotes: productData.seo?.productNotes || ''
          },
          productImage: productData.productImage || '',
          productGallery: productData.productGallery || [],
          productVideos: productData.productVideos || [],
          categoryId: productData.categoryId || [], // Ensure this is populated
          productStatus: productData.productStatus || '',
          date: productData.date || '',
          updatedAt: productData.updatedAt || '',
          __v: productData.__v || 0,
          productSpecification: productData.productSpecification || []
        };

        this.product = product; // Store the mapped product details
        this.bindProductDetailsToForm(product); // Bind data to the form

        // Fetch categories after product details are loaded
        this.getCategories();
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  // Bind product details to the form
  bindProductDetailsToForm(product: Product): void {
    if (!product) {
      console.error('Product is undefined');
      return;
    }

    // Bind product details to the form fields
    this.productName = product.productName || '';
    this.productDescription = product.productDescription || '';
    this.productShortDescription = product.productShortDescription || '';
    this.productSlug = product.productSlug || '';
    this.productCode = product.productCode || '';
    this.selectedBrand = product.productBrand || '';

    // Initialize selectedCategoryIds with existing category IDs
    this.selectedCategoryIds = product.categoryId || [];

    // Check if nested properties are defined
    if (product.general) {
      this.regularPrice = product.general.regularPrice || 0;
      this.salePrice = product.general.salePrice || 0;
      this.taxStatus = product.general.taxStatus || '';
      this.taxClass = product.general.taxClass || '';
    }

    // Repeat for other nested properties...
  }


  selectedCategoryIds: string[] = [];




  updateProductDetails(): void {
    const updatedProduct = {
      categoryId: this.selectedCategoryIds, // Include selected category IDs
      productName: this.productName,
      productBrand: this.selectedBrand,
      productImage: this.featuredImage,
      productShortDescription: this.productShortDescription,
      productSpecification: this.productSpecifications,
      seo: {
        productTitle: this.seoTitle,
        prodDescription: this.seoDescription,
        productTags: this.tags,
        productNotes: 'Yes' // Update if dynamic
      },
      general: {
        regularPrice: this.regularPrice,
        salePrice: this.salePrice,
        taxStatus: this.taxStatus,
        taxClass: this.taxClass
      },
      inventory: {
        sku: this.sku,
        stockManagement: this.stockManagement,
        stockStatus: this.stockStatus,
        soldIndividually: this.soldIndividually,
        inventoryStatus: 'Only Online' // Update if dynamic
      },
      shipping: {
        productDimensions: {
          height: this.height,
          width: this.width,
          length: this.length
        },
        weight: this.weight
      },
      date: new Date().toLocaleDateString(),
      productStatus: this.productStatus
    };

    this.ProductService.updateProductById(this.productId, updatedProduct).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        alert('Product updated successfully!');
        // Refresh product details after update
        this.ProductService.getProductById(this.productId).subscribe((data) => {
          console.log('Refreshed product data:', data);
        });
      },
      error: (error) => {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again.');
      }
    });
  }

  onCategoryChange(categoryId: string, isSelected: boolean): void {
    if (isSelected) {
      // Add the category ID to the selectedCategoryIds array if it's selected
      if (!this.selectedCategoryIds.includes(categoryId)) {
        this.selectedCategoryIds.push(categoryId);
      }
    } else {
      // Remove the category ID from the selectedCategoryIds array if it's deselected
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    }
  }




}
