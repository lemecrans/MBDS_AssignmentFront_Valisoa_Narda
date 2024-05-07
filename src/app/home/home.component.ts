import { Component } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignmet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  myAssignments: Assignment[] = [];
  constructor(private assi_serv: AssignmentService,
    private router:Router ){}
  

  ngOnInit() {
    this.assi_serv.getAll()
    .subscribe((reponse: Assignment[]) => {
      this.myAssignments = reponse;
    }, error => {
      this.router.navigate(['/erreur']);
    });
  }

}
