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
  selectedCategory: Category | null = null;
  selectedSubCategory: Category | null = null;
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


  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}




  ngOnInit(): void {
    const userData = localStorage.getItem('users');
    console.log("User Data from LocalStorage:", userData); // Debugging

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed User Object:", parsedUser); // Debugging
        if (parsedUser?.userId) {
          this.userId = parsedUser.userId;
          console.log("User ID Set Successfully:", this.userId); // Debugging
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


}
