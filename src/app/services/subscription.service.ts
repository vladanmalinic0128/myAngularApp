import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllSubscriptions() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/subscriptions`, {headers});
  }

  postSubscription(id: number, subscribed: boolean) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/subscriptions`, {id: id, subscribed: subscribed}, {headers});
  }
}
