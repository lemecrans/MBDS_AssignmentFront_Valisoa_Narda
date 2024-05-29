import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api/etu';
  constructor(private http:HttpClient) { }

  log(pseudo:string, mdp:string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: pseudo, mdp: mdp }; 
    return this.http.post<any>(this.uri + '/login', body, { headers: headers });
  }
}
