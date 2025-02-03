import {Component, inject, OnInit} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category, GetAllCategoriesResponse } from '../../model/category.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

export interface CategoryUI extends Category {
  isExpanded?: boolean;
}

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgFor,
  ],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  isAddCategoryModalOpen = false;
  isEditCategoryModalOpen = false;
  isEditSubCategoryModalOpen = false;
  categories: CategoryUI[] = [];
  isLoading=false

  selectedCategory: any = {
    slug: '',
    categoryName: '',
    parentCategory: '',
    categoryDescription: '',
    title: '',
    metaDescription: '',
    subCategories: [],
  };
  subCategories: Category[] = []; // Array to store subcategories

  newCategory: any = {}; // Your category object
  userId: string = ''; // User ID will be fetched from localStorage
  router = inject(Router);

  openAddCategoryModal(): void {
    this.isAddCategoryModalOpen = true;
  }

  toggleCategory(category: CategoryUI): void {
    category.isExpanded = !category.isExpanded;
  }


  closeAddCategoryModal(): void {
    this.isAddCategoryModalOpen = false;
  }

  openEditCategoryModal(category: Category): void {
    this.selectedCategory = category;
    this.isEditCategoryModalOpen = true;
  }

  closeEditCategoryModal(): void {
    this.isEditCategoryModalOpen = false;
    this.selectedCategory = null;
  }


  openEditSubCategoryModal(subCategory: Category): void {
    this.selectedCategory = { ...subCategory }; // Copy the sub-category data
    this.isEditSubCategoryModalOpen = true;
  }

  closeEditSubCategoryModal(): void {
    this.isEditSubCategoryModalOpen = false;
    // Reset selectedCategory to the default object
    this.selectedCategory = {
      slug: '',
      subCategories: [],
      categoryName: '',
      parentCategory: '',
      categoryDescription: '',
      title: '',
      metaDescription: '',
    };
  }


  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}




  ngOnInit(): void {
    const userData = localStorage.getItem('users');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?.userId) {
          this.userId = parsedUser.userId;

        } else {
          console.error(" User ID is missing in parsed object!");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.error("User ID is not available in localStorage!");
    }
    this.getCategories();
  }





  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: GetAllCategoriesResponse) => {
        if (!response || !response.categories || !Array.isArray(response.categories)) {
          console.error("Invalid API response:", response);
          this.categories = [];
          return;
        }

        this.categories = response.categories.map((cat) => ({
          ...cat,
          isExpanded: false,
          subCategories: cat.subCategories ?? [] // Ensure subCategories is always an array
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }




// Method to add a new category
  addNewCategory(category: any): void {
    const userData = localStorage.getItem('users');

    if (!userData) {
      console.error('User data is not available in localStorage!');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser?.userId) {
        this.userId = parsedUser.userId;
      } else {
        console.error('User ID is missing in the stored user data!');
        return;
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return;
    }

    // Attach userId to category object
    category.userId = this.userId;

    // API call
    this.categoryService.addCategory(category).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        this.newCategory = {}; // Reset the category form
        this.closeAddCategoryModal();  // Close the modal
        window.location.reload();      // Reload the page
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  }


  onEditCategorySubmit(): void {
    if (this.selectedCategory) {
      // Fetch userId from localStorage
      const userData = localStorage.getItem('users');
      if (!userData) {
        console.error('User data is not available in localStorage!');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?.userId) {
          this.selectedCategory.userId = parsedUser.userId; // Attach userId
        } else {
          console.error('User ID is missing in the stored user data!');
          return;
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return;
      }

      // Make API call with updated category data
      this.categoryService.updateCategory(this.selectedCategory).subscribe({
        next: (response) => {
          console.log('Category updated successfully:', response);
          this.closeEditCategoryModal();
          this.getCategories(); // Refresh the categories list
        },
        error: (error) => {
          console.error('Error updating category:', error);
        }
      });
    }
  }



  onDeleteCategory(categoryId: string): void {
    if (!categoryId) {
      console.error('Invalid category ID');
      return;
    }

    const userData = localStorage.getItem('users');
    if (!userData) {
      console.error('User data is not available in localStorage!');
      return;
    }

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser?.userId;

    if (!userId) {
      console.error('User ID is missing!');
      return;
    }

    // Find the category to determine if it's a parent or subcategory
    const categoryToDelete = this.findCategoryById(categoryId);

    if (!categoryToDelete) {
      console.error('Category not found!');
      return;
    }

    // Check if it's a subcategory (has a parentCategory field)
    const isSubCategory = !!categoryToDelete.parentCategory;

    if (confirm(`Are you sure you want to delete this ${isSubCategory ? 'subcategory' : 'category'}?`)) {
      this.isLoading = true;
      this.categoryService.deleteCategoryById(categoryId, userId).subscribe(
        () => {
          alert(`${isSubCategory ? 'Subcategory' : 'Category'} Deleted Successfully!`);
          this.getCategories(); // Refresh the categories list
          this.isLoading = false;
        },
        (error) => {
          console.error(`Couldn't delete ${isSubCategory ? 'subcategory' : 'category'}`, error);
          alert(`Couldn't Delete ${isSubCategory ? 'Subcategory' : 'Category'}`);
          this.isLoading = false;
        }
      );
    }
  }

// Helper method to find a category or subcategory by ID
  findCategoryById(categoryId: string): Category | null {
    for (const category of this.categories) {
      if (category._id === categoryId) {
        return category;
      }
      // Check subcategories
      if (category.subCategories && category.subCategories.length > 0) {
        const subCategory = category.subCategories.find(sub => sub._id === categoryId);
        if (subCategory) {
          return subCategory;
        }
      }
    }
    return null;
  }


  onParentCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const parentCategoryId = selectElement.value; // Get the selected value

    if (parentCategoryId) {
      this.categoryService.getSubCategoriesByCategoryId(parentCategoryId).subscribe({
        next: (response) => {
          this.subCategories = response.subcategories; // Store subcategories
          this.newCategory.subCategory = ''; // Reset subcategory selection
        },
        error: (error) => {
          console.error('Error fetching subcategories:', error);
        }
      });
    } else {
      this.subCategories = []; // Clear subcategories if no parent category is selected
    }
  }


}
