import { Component } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { AjoutService } from '../services/ajout.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { Matiere } from '../models/matiere';
import { AssignmentService } from '../services/assignment.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    MatToolbarModule
  ],
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.css'
})
export class AjoutComponent {
  assignment: Assignment = {
    _id: 0,
    dateDeRendu: new Date(),
    titre: '',
    rendu: false,
    matiere: {
      titre: '',
      prof: {
        nom: '',
        photo: '',
        email: ''
      }
    },
    note: 0,
    remarques: ''
  }
  lista: Matiere[] = [];

  ngOnInit(): void {
    if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" &&  localStorage.getItem('role')=='ETU'){
      this.assi_serv.getAllMatiere().subscribe((reponse: Matiere[]) => {
        this.lista = reponse;
        console.log(reponse)
      }, error => {
        this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
      });
    }else{
      this.router.navigate(['']);
    }
  }
  constructor(private assi_serv: AssignmentService, private add_serv: AjoutService,
    private router:Router){}

    
  onSubmit(event: any): void {
    if (this.assignment.titre!="" && this.assignment.dateDeRendu && this.assignment.matiere.titre ) {
      this.add_serv.add(this.assignment)
      .subscribe((reponse) => {
        this.router.navigate(['home'], { queryParams: { message: "Assignment Ajouter avec succés!" } });
      }, error => {
        this.router.navigate(['ajout'], { queryParams: { message: "Une erreur est survenue, Merci de réessayer!" } });
      });
    }
  }
  home():void{
    this.router.navigate(['/home']);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }
}
