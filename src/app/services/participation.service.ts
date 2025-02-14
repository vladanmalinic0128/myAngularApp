import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participation} from "../interfaces/participation";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  addParticipation(participation: Participation){
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/participations`, participation, {headers});
  }

  getParticipations() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/participations`, {headers});
  }

}
