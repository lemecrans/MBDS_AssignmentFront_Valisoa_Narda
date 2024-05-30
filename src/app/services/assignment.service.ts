import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
import { map } from 'rxjs/operators';
import { ResponseItem, Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api';
  constructor(private http:HttpClient) { }

  getAll() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<any>(this.uri + '/etu/assignment/all', body, { headers: headers });
  }
  getNonrendu() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<Assignment[]>(this.uri + '/etu/assignemnt/nonrendu', body, { headers: headers });
  }
  getUrgent() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<Assignment[]>(this.uri + '/etu/assignment/alert/deadline', body, { headers: headers });
  }
  getEnAttente() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { emailProf: Mypseudo }; 
    return this.http.post<ResponseItem[]>(this.uri + '/prof/liste-attente', body, { headers: headers });
  }
  getOne(id:string,id_etu:string): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('ID');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let body ={}
    if(localStorage.getItem('role')=='Prof'){
      body = { studentId: id_etu, assiId : id };
    }else{
      
      body = { studentId: Mypseudo, assiId : id };
    }
    console.log(body);
    return this.http.post<any>(this.uri + '/etu/assignment/id', body, { headers: headers });
  }
  rendre(id:number): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('ID');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { studentId: Mypseudo, assignmentId : id };
    return this.http.post<any>(this.uri + '/etu/assignment/rendre', body, { headers: headers });
  }
  noter(id:number,noty:String,rem:String, etu:string): Observable<Assignment>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { studentId: etu, idAssignment: id, note: noty, remarques: rem };
    return this.http.put<any>(`${this.uri}/prof/assignement/noter`, body, { headers: headers });
  }
  getAllMatiere(){
    return this.http.get<{ message: string, data: Matiere[] }>(this.uri + '/matiere/liste')
    .pipe(map(response => response.data));
  }
}
