import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api';
  constructor(private http:HttpClient) { }

  log(pseudo:string, mdp:string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: pseudo, mdp: mdp }; 
    return this.http.post<any>(this.uri + '/etu/login', body, { headers: headers });
  }
  logprof(pseudo:string, mdp:string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { email: pseudo, mdp: mdp }; 
    return this.http.post<any>(this.uri + '/prof/login', body, { headers: headers });
  }
}
