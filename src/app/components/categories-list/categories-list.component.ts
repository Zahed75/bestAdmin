import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule} from '@angular/forms';
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



}
