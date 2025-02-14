import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Participation} from "../interfaces/participation";
import {Diary} from "../interfaces/diary";
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  addDiaryRecord(diary: Diary) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/diaries`, diary, {headers});
  }

  getDiaryRecords() {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.get(`${this.baseUrl}/diaries`, {headers});
  }

  getDiaryPdf(): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
    });

    return this.http.get(`${this.baseUrl}/diaries/pdf`, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }

  downloadPdf(): void {
    this.getDiaryPdf().subscribe(response => {
      const contentDispositionHeader = response.headers.get('Content-Disposition');
      const filename = this.getFilenameFromContentDisposition(contentDispositionHeader);
      saveAs(response.body, filename);
    });
  }

  private getFilenameFromContentDisposition(contentDisposition: string): string {
    return 'diary.pdf';
  }
}
