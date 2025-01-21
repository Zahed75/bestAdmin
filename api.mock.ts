// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {HttpClient} from '@angular/common/http';
//
// export class ItemService {
//   private apiUrl = 'https://your-api-url.com/items'; // Replace with your API URL
//
//   constructor(private http: HttpClient) {
//   }
//
//   // Create
//   createItem(item: any): Observable<any> {
//     return this.http.post(this.apiUrl, item);
//   }
//
//   // Read all items
//   getItems(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
//
//   // Read single item by ID
//   getItem(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }
//
//   // Update item
//   updateItem(id: number, item: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, item);
//   }
//
//   // Delete item
//   deleteItem(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }
//
//
//
//
// //  API CALLING FROM SERVICE
// export class ItemListComponent implements OnInit {
//   items: any[] = [];
//   newItem = {name: '', description: ''};
//
//   constructor(private itemService: ItemService) {
//   }
//
//   ngOnInit(): void {
//     this.fetchItems();
//   }
//
//   // Fetch all items
//   fetchItems(): void {
//     this.itemService.getItems().subscribe((data) => {
//       this.items = data;
//     });
//   }

// Fetch single item by ID
// fetchItemById(id: number): void {
//   this.itemService.getItem(id).subscribe((data) => {
//     this.selectedItem = data;
//   });
// }

//
//   // Create new item
//   createItem(): void {
//     this.itemService.createItem(this.newItem).subscribe((data) => {
//       this.items.push(data);
//       this.newItem = {name: '', description: ''}; // Clear the form
//     });
//   }
//
//   // Update item
//   updateItem(id: number, item: any): void {
//     this.itemService.updateItem(id, item).subscribe((data) => {
//       const index = this.items.findIndex((i) => i.id === id);
//       if (index !== -1) {
//         this.items[index] = data;
//       }
//     });
//   }
//
//   // Delete item
//   deleteItem(id: number): void {
//     this.itemService.deleteItem(id).subscribe(() => {
//       this.items = this.items.filter((item) => item.id !== id);
//     });
//   }
// }
