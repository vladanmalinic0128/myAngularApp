import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllCities() {
    return this.http.get(`${this.baseUrl}/api/cities`);
  }
}
