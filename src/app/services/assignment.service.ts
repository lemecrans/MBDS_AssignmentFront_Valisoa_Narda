import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { Observable } from 'rxjs';

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
  getOne(id:string): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo, assiId : id };
    return this.http.post<any>(this.uri + '/assignment/id', body, { headers: headers });
  }
  rendre(id:number): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('ID');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { studentId: Mypseudo, assignmentId : id };
    return this.http.post<any>(this.uri + '/assignment/rendre', body, { headers: headers });
  }
}
