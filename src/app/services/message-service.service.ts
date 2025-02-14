import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  addMessage(message: Message) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/messages`, message, {headers});
  }

  getMessages() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/messages`, {headers});
  }

  updateMessage(id: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.put(`${this.baseUrl}/messages/` + id, {},{headers});
  }
}
