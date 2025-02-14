import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private baseUrl = 'https://api.api-ninjas.com/v1/exercises';

  constructor(private http: HttpClient) { }

  getAllRecommendations() {
    const headers = { 'X-Api-Key': 'PODXoTB1jfZGUHm3MoxvHg==kPzLNvk015hYbZIv' };
    return this.http.get(`${this.baseUrl}`, {headers});
  }
}
