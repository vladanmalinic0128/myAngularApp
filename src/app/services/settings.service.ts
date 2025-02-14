import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../interfaces/settings";
import {EditPassword} from "../interfaces/edit-password";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  changeSettings(settings: Settings) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/settings/edit-data`, settings, {headers});
  }

  changePassword(editPassword: EditPassword) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/settings/edit-password`, editPassword, {headers});
  }
}
