import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category, GetAllCategoriesResponse } from '../../model/category.model';

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
  selectedCategory: Category | null = null;
  selectedSubCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetch categories from the API and ensure `categories` and `subCategories` are always defined.
   */
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

  openAddCategoryModal(): void {
    this.isAddCategoryModalOpen = true;
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

  /**
   * Handle category addition and ensure form validation.
   */
  onAddCategorySubmit(form: NgForm): void {
    if (!form.valid) {
      console.error('Form is invalid. Please check the required fields.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('users') || '{}');
    const userId = user?.userId;

    if (!userId) {
      console.error('User ID is missing. Ensure the user is logged in.');
      alert('User authentication issue. Please log in again.');
      return;
    }

    const newCategory: Category = {
      userId,
      categoryName: form.value.categoryName?.trim(),
      categoryDescription: form.value.categoryDescription?.trim() || '',
      parentCategory: form.value.parentCategory || null,
      subCategories: []
    };

    console.log('Submitting new category:', newCategory);

    this.categoryService.addCategory(newCategory).subscribe({
      next: (category) => {
        this.categories.push({ ...category, isExpanded: false, subCategories: category.subCategories ?? [] });
        this.closeAddCategoryModal();
        form.resetForm();
      },
      error: (error) => {
        console.error('Error adding category:', error);
        alert(error.message || 'Failed to create category.');
      }
    });
  }

  /**
   * Handle category editing.
   */
  onEditCategorySubmit(form: any): void {
    if (this.selectedCategory) {
      const updatedCategory: Category = {
        ...this.selectedCategory,
        categoryName: form.value.categoryName,
        categoryDescription: form.value.categoryDescription
      };

      this.categoryService.updateCategory(updatedCategory._id!, updatedCategory).subscribe({
        next: (category) => {
          const categoryIndex = this.categories.findIndex(cat => cat._id === category._id);
          if (categoryIndex !== -1) {
            this.categories[categoryIndex] = { ...category, isExpanded: this.categories[categoryIndex].isExpanded, subCategories: this.categories[categoryIndex].subCategories };
          }
          this.closeEditCategoryModal();
        },
        error: (error) => {
          console.error('Error updating category:', error);
        }
      });
    }
  }

  /**
   * Toggle the visibility of a category's subcategories.
   */
  toggleCategory(category: CategoryUI): void {
    if (!category.subCategories) {
      category.subCategories = []; // Ensure it's always an array
    }
    category.isExpanded = !category.isExpanded;
  }

  openEditSubCategoryModal(subCategory: Category): void {
    this.selectedSubCategory = subCategory;
    this.isEditSubCategoryModalOpen = true;
  }

  closeEditSubCategoryModal(): void {
    this.isEditSubCategoryModalOpen = false;
    this.selectedSubCategory = null;
  }

  /**
   * Handle sub-category editing.
   */
  onEditSubCategorySubmit(form: any): void {
    if (this.selectedSubCategory) {
      const updatedSubCategory: Category = {
        ...this.selectedSubCategory,
        categoryName: form.value.subCategoryName
      };

      this.categoryService.updateSubCategory(updatedSubCategory._id!, updatedSubCategory).subscribe({
        next: (subCategory) => {
          const category = this.categories.find(cat => cat.subCategories?.some(sub => sub._id === subCategory._id));
          if (category) {
            const subCategoryIndex = category.subCategories.findIndex(sub => sub._id === subCategory._id);
            category.subCategories[subCategoryIndex] = subCategory;
          }
          this.closeEditSubCategoryModal();
        },
        error: (error) => {
          console.error('Error updating sub-category:', error);
        }
      });
    }
  }

  /**
   * Handle sub-category deletion.
   */
  deleteSubCategory(subCategory: Category): void {
    this.categoryService.deleteSubCategory(subCategory._id!).subscribe({
      next: () => {
        const category = this.categories.find(cat =>
          cat.subCategories?.some(sub => sub._id === subCategory._id)
        );
        if (category) {
          category.subCategories = category.subCategories?.filter(sub => sub._id !== subCategory._id) || [];
        }
      },
      error: (error) => {
        console.error('Error deleting sub-category:', error);
      }
    });
  }
}
