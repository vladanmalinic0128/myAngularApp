import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/users`, {headers});
  }
}
