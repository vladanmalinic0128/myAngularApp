import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FitnessProgramFilterRequest} from "../interfaces/fitness-program-filter-request";
import {FitnessProgramDetails} from "../interfaces/fitness-program-details";
import {FitnessProgramsRole} from "../enums/fitness-programs-role";

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramsService {
  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getAllFitnessPrograms(fitnessProgramsRole: FitnessProgramsRole) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    const params = new HttpParams().set('programTypes', fitnessProgramsRole);
    if(fitnessProgramsRole !== FitnessProgramsRole.allPrograms)
      return this.http.get(`${this.baseUrl}/api/fitness-programs`, { headers, params });
    else
      return this.http.get(`${this.baseUrl}/api/fitness-programs`, { params });
  }

  filterFitnessProgram(filterDetails: FitnessProgramFilterRequest) {
    return this.http.post(`${this.baseUrl}/api/fitness-programs/filtered`, filterDetails);
  }

  getFintessProgram(id: number) {
    return this.http.get(`${this.baseUrl}/api/fitness-programs/` + id);
  }

  deleteFintessProgram(id: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.delete(`${this.baseUrl}/fitness-programs/` + id, {headers});
  }

  markFitnessProgramAsFinished(id: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.put(`${this.baseUrl}/fitness-programs/finished/` + id, null,{headers});
  }

  addFitnessProgram(fitnessProgram: FitnessProgramDetails) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/fitness-programs`, fitnessProgram, {headers});
  }

  editFitnessProgram(fitnessProgram: FitnessProgramDetails) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.put(`${this.baseUrl}/fitness-programs/` + fitnessProgram.id, fitnessProgram, {headers});
  }

  getFitnessProgramStatus(id: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/fitness-programs/status/` + id,{headers});
  }
}
