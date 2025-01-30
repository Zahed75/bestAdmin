import { Component } from '@angular/core';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
  isEditSubCategoryModalOpen = false;

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
