import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-list',
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgFor
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  isAddCategoryModalOpen = false; // Controls the "Add Category" modal
  isEditSubCategoryModalOpen = false; // Controls the "Edit Sub-Category" modal

  // Sample data for categories with isExpanded property
  categories: any[] = [
    {
      name: 'Electronics',
      subCategories: ['Smartphones', 'Laptops', 'Accessories'],
      isExpanded: false
    },
    {
      name: 'Clothing',
      subCategories: ['Men’s Clothing', 'Women’s Clothing'],
      isExpanded: false
    }
  ];

  // Open Add Category Modal
  openAddCategoryModal() {
    this.isAddCategoryModalOpen = true;
  }

  // Close Add Category Modal
  closeAddCategoryModal() {
    this.isAddCategoryModalOpen = false;
  }

  // Handle Add Category Form Submission
  onAddCategorySubmit(form: any) {
    const newCategory = {
      name: form.value.categoryName,
      subCategories: [],
      isExpanded: false
    };
    this.categories.push(newCategory); // Add the new category to the list
    this.closeAddCategoryModal(); // Close the modal
    form.reset(); // Reset the form
  }

  // Toggle category expansion
  toggleCategory(category: any) {
    category.isExpanded = !category.isExpanded;
  }

  // Open Edit Sub-Category Modal
  openEditSubCategoryModal(subCategory: any) {
    this.isEditSubCategoryModalOpen = true;
    // You can pass the subCategory data to the modal for editing
  }

  // Close Edit Sub-Category Modal
  closeEditSubCategoryModal() {
    this.isEditSubCategoryModalOpen = false;
  }

  // Delete Sub-Category
  deleteSubCategory(subCategory: any) {
    // Add logic to delete the sub-category
    console.log('Delete sub-category:', subCategory);
  }
}
