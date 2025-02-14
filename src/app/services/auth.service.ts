import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Login} from "../interfaces/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/api/register`, userDetails);
  }

  loginUser(userDetails: Login) {
    return this.http.post(`${this.baseUrl}/api/authenticate`, userDetails);
  }

  sendConfirmationMail(userDetails: Login) {
    return this.http.post(`${this.baseUrl}/api/send-confirmation-mail`, userDetails);
  }

  existsByUser(username: string) {
    return this.http.post(`${this.baseUrl}/api/username-exists`, {username: username});
  }

  existsByEmail(email: string) {
    return this.http.post(`${this.baseUrl}/api/email-exists`, {email: email});
  }
}
