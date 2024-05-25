import { Component } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignmet';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['titre', 'matiere', 'auteur', 'dateDeRendu', 'rendu'];
  myAssignments: Assignment[] = [];
  constructor(private assi_serv: AssignmentService,
    private router:Router ){}
  

  ngOnInit() {
    this.assi_serv.getAll()
    .subscribe((reponse: Assignment[]) => {
      this.myAssignments = reponse;
    }, error => {
      this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
    });
  }
  onSelect(assignment: Assignment): void {
    this.router.navigate(['/assignment-detail', assignment._id]);
  }

}
