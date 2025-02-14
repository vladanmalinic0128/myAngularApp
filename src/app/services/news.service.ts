import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as xmlJs from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(private http: HttpClient) { }

  getAllRecommendations(): Observable<any> {
    return this.http.get('/AceFitFacts', { responseType: 'text' }).pipe(
      map((xmlString: string) => {
        console.log(xmlString);
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        return xmlJs.xml2js(xmlString, options);
      })
    );
  }
}
