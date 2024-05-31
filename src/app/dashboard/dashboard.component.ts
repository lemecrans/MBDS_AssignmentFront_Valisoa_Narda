import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from '../services/assignment.service';
import { AffichageAssignment, Affichage_Assignment, Assignment } from '../models/assignmet';
import { ResponseItem, Student } from '../models/student';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  myAssignments: Assignment[] = [];
  data: Affichage_Assignment[] = [];
  displayedColumns: string[] = ['titre', 'dateDeRendu', 'Etudiant'];
  constructor(private assi_serv: AssignmentService,
    private router:Router ){}
  ngOnInit() {
    if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" &&  localStorage.getItem('role')=='Prof'){
      this.assi_serv.getEnAttente()
        .subscribe((reponse: ResponseItem[]) => {
            for (let item of reponse) {
              let student = item.student;
              for (let assi of student.assignments) {
                  this.data=this.data.concat(new AffichageAssignment(assi._id, assi.dateDeRendu, assi.titre,assi.note,assi.remarques,student.pseudo,student._id ))
              }
            }
            console.log(this.data);
        }, error => {
            this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });

    }else{
      this.router.navigate(['']);
    }
  }
  onSelect(assignment: AffichageAssignment): void {
    this.router.navigate(['/assignment-detail', assignment._id,assignment.id_etu]);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }

}
