import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  constructor(private http: HttpClient) { }

  translate(s: string) {
    // this.http.get()
  }
}
