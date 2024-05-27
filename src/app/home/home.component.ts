import { Component } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignmet';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['titre', 'matiere', 'auteur', 'dateDeRendu', 'rendu'];
  displayedColumns2: string[] = ['titre', 'matiere', 'dateDeRendu'];
  myAssignments: Assignment[] = [];
  nonrendu: Assignment[] = [];
  urgent: Assignment[] = [];
  constructor(private assi_serv: AssignmentService,
    private router:Router ){}
  

  ngOnInit() {
    if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" ){
      this.assi_serv.getAll()
        .subscribe((reponse: Assignment[]) => {
          this.myAssignments = reponse;
        }, error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
      this.assi_serv.getNonrendu()
        .subscribe((reponse: Assignment[]) => {
          this.nonrendu = reponse;
        }, error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
      this.assi_serv.getUrgent()
        .subscribe((reponse: Assignment[]) => {
          this.urgent = reponse;
        }, error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
        console.log(this.nonrendu);

    }else{
      this.router.navigate(['']);
    }
  }
  onSelect(assignment: Assignment): void {
    this.router.navigate(['/assignment-detail', assignment._id]);
  }
  ajout():void{
    this.router.navigate(['/ajout']);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }

}
