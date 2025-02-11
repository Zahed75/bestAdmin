import { Component, inject, OnInit } from '@angular/core';
import {NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category, SubCategory, GetAllCategoriesResponse } from '../../model/category.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface CategoryUI extends Category {
  isExpanded?: boolean;
  subCategories?: SubCategory[]; // Use SubCategory[] instead of CategoryUI[]
}

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgFor,
    NgTemplateOutlet,
  ],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  isAddCategoryModalOpen = false;
  isEditCategoryModalOpen = false;
  isEditSubCategoryModalOpen = false;
  categories: CategoryUI[] = [];
  isLoading = false;

  selectedCategory: any = {
    slug: '',
    categoryName: '',
    parentCategory: '',
    categoryDescription: '',
    title: '',
    metaDescription: '',
    subCategories: [],
  };

  newCategory: any = {}; // Your category object
  userId: string = ''; // User ID will be fetched from localStorage
  router = inject(Router);

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
          console.error('User ID is missing in parsed object!');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('User ID is not available in localStorage!');
    }

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

        // Recursively map categories and subcategories
        this.categories = this.mapCategories(response.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  // Helper method to recursively map categories and subcategories
  private mapCategories(categories: Category[]): CategoryUI[] {
    return categories.map((cat) => ({
      ...cat,
      isExpanded: false,
      subCategories: cat.subCategories ? this.mapSubCategories(cat.subCategories) : [], // Map subcategories
    }));
  }

  // Helper method to map subcategories
  private mapSubCategories(subCategories: SubCategory[]): SubCategory[] {
    return subCategories.map((subCat) => ({
      ...subCat,
    }));
  }

  toggleCategory(category: CategoryUI): void {
    category.isExpanded = !category.isExpanded;
  }

  openAddCategoryModal(): void {
    this.isAddCategoryModalOpen = true;
  }

  closeAddCategoryModal(): void {
    this.isAddCategoryModalOpen = false;
  }

  openEditCategoryModal(category: CategoryUI): void {
    this.selectedCategory = category;
    this.isEditCategoryModalOpen = true;
  }

  closeEditCategoryModal(): void {
    this.isEditCategoryModalOpen = false;
    this.selectedCategory = null;
  }

  openEditSubCategoryModal(subCategory: SubCategory): void {
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
        this.closeAddCategoryModal(); // Close the modal
        this.getCategories(); // Refresh the categories list
      },
      error: (error) => {
        console.error('Error adding category:', error);
      },
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
        },
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

    // Check if it's a subcategory using the type guard
    const isSubCategory = !this.isCategory(categoryToDelete);

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
  findCategoryById(categoryId: string): Category | SubCategory | null {
    for (const category of this.categories) {
      if (category._id === categoryId) {
        return category; // Return as Category
      }
      // Check subcategories
      if (category.subCategories && category.subCategories.length > 0) {
        const subCategory = this.findSubCategoryById(category.subCategories, categoryId);
        if (subCategory) {
          return subCategory; // Return as SubCategory
        }
      }
    }
    return null;
  }

  // Helper method to recursively find a subcategory by ID
  private findSubCategoryById(subCategories: SubCategory[], categoryId: string): SubCategory | null {
    for (const subCategory of subCategories) {
      if (subCategory._id === categoryId) {
        return subCategory; // Return as SubCategory
      }
    }
    return null;
  }

  private isCategory(categoryToDelete: Category | SubCategory): boolean {
    return (categoryToDelete as Category).subCategories !== undefined;
  }
}
