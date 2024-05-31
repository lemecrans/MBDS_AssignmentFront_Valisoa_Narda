import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { map } from 'rxjs';
import { Prof } from '../models/prof';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api/admin';
  constructor(private http:HttpClient) { }

  log(pseudo:string, mdp:string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { email: pseudo, mdp: mdp }; 
    return this.http.post<any>(this.uri + '/login', body, { headers: headers });
  }
  getAllStudent(){
    return this.http.get<Student[] >(this.uri + '/etudiant/liste')
  }
  getAllProf(){
    return this.http.get<Prof[] >(this.uri + '/prof/liste')
  }
  getOneStu(id:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { id: id }; 
    return this.http.post<Student>(this.uri + '/etudiant/id/', body, { headers: headers });
  }
  getOneProf(id:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { id: id }; 
    return this.http.post<Prof>(this.uri + '/prof/id/', body, { headers: headers });
  }
  updateStu(id:string, stu:Student){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { id: id, etudiant : stu }; 
    return this.http.put(this.uri + '/etudiant/modifier', body, { headers: headers });
  }
  updatePro(id:string, stu:Prof){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { id: id, prof : stu }; 
    return this.http.put(this.uri + '/prof/modifier', body, { headers: headers });
  }
  deleteStu(id:string){
    return this.http.delete(this.uri + '/etudiant/delete/?id='+id);
  }
  deletePro(id:string){
    return this.http.delete(this.uri + '/prof/delete/?id'+id);
  }

  
}
