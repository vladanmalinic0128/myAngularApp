import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllPaymentTypes() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/payment-types`, {headers});
  }
 }
