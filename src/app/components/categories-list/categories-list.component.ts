import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category, GetAllCategoriesResponse } from '../../model/category.model';

// Extend Category to include an optional "isExpanded" UI property.
export interface CategoryUI extends Category {
  isExpanded?: boolean;
}

@Component({
  selector: 'app-categories-list',
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgFor
  ],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  isAddCategoryModalOpen = false; // Controls the "Add Category" modal
  isEditSubCategoryModalOpen = false; // Controls the "Edit Sub-Category" modal

  // Initialize categories as an array of CategoryUI
  categories: CategoryUI[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // Call the API to get all categories.
  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: GetAllCategoriesResponse) => {
        // Optionally, add the isExpanded property to each category
        this.categories = response.categories.map((cat) => ({ ...cat, isExpanded: false }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  // Open Add Category Modal
  openAddCategoryModal(): void {
    this.isAddCategoryModalOpen = true;
  }

  // Close Add Category Modal
  closeAddCategoryModal(): void {
    this.isAddCategoryModalOpen = false;
  }

  // Handle Add Category Form Submission
  onAddCategorySubmit(form: any): void {

    const newCategory: CategoryUI = {
      slug: '', // You might generate or require a slug from your backend
      subCategories: [],
      categoryName: form.value.categoryName,
      isExpanded: false
    };
    this.categories.push(newCategory); // Add the new category to the list
    this.closeAddCategoryModal(); // Close the modal
    form.reset(); // Reset the form
  }

  // Toggle category expansion
  toggleCategory(category: CategoryUI): void {
    category.isExpanded = !category.isExpanded;
  }

  // Open Edit Sub-Category Modal
  openEditSubCategoryModal(subCategory: any): void {
    this.isEditSubCategoryModalOpen = true;
    // You can pass the subCategory data to the modal for editing
  }

  // Close Edit Sub-Category Modal
  closeEditSubCategoryModal(): void {
    this.isEditSubCategoryModalOpen = false;
  }

  // Delete Sub-Category
  deleteSubCategory(subCategory: any): void {
    // Add logic to delete the sub-category
    console.log('Delete sub-category:', subCategory);
  }

}
