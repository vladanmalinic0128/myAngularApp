import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentRequest} from "../interfaces/comment-request";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getComments(id: number) {
    return this.http.get(`${this.baseUrl}/api/fitness-programs/` + id + '/comments');
  }

  addComment(commentRequest: CommentRequest, id: number) {
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') };
    return this.http.post(`${this.baseUrl}/fitness-programs/` + id + '/comments', commentRequest, {headers});
  }
}
