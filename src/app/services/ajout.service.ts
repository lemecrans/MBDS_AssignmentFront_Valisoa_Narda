import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignmet';

@Injectable({
  providedIn: 'root'
})
export class AjoutService {
  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api/etu';
  constructor(private http:HttpClient) { }

  add(assignement :Assignment) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: localStorage.getItem('pseudo'), addAssignment: assignement }; 
    return this.http.post<any>(this.uri + '/assignment/ajout', body, { headers: headers });
  }
}
