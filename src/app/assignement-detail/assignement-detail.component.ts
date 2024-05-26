import { Component } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../services/assignment.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assignement-detail',
  standalone: true,
  imports: [ MatCardModule,
    MatButtonModule,],
  templateUrl: './assignement-detail.component.html',
  styleUrl: './assignement-detail.component.css'
})
export class AssignementDetailComponent {
  
  myAssignment: Assignment | undefined ;
  constructor(private route: ActivatedRoute, private assignmentService: AssignmentService,private router:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" ){
      const id = this.route.snapshot.paramMap.get('id')?? '';
      this.assignmentService.getOne(id).subscribe(
        res => {
          this.myAssignment = res;
        },
        error => {
          console.error('Erreur lors de la récupération de l\'assignment:', error);
        }
      );
    }else{
      this.router.navigate(['']);
    }
  }
  rendre(id:number):void{
    this.assignmentService.rendre(id).subscribe((reponse) => {
      console.log(reponse);
      this.router.navigate(['/home']);
    }, error => {
      this.router.navigate(['/erreur']);
    });
  }

}
