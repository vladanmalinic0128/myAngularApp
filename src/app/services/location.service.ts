import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllLocations() {
    return this.http.get(`${this.baseUrl}/api/locations`);
  }

}
