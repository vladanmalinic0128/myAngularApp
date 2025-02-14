import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/api/categories`);
  }

  getAllSpecialAttributesByCategory(categoryId: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/api/categories/${categoryId}/specificAttributes`, {headers});
  }
}
