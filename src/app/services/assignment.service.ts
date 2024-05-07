import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  uri = 'http://localhost:8010/api/etu';
  constructor(private http:HttpClient) { }

  getAll() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<any>(this.uri + '/assignment/all', body, { headers: headers });
  }
}
