import { Component } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../services/assignment.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-assignement-detail',
  standalone: true,
  imports: [ 
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    MatGridListModule],
  templateUrl: './assignement-detail.component.html',
  styleUrl: './assignement-detail.component.css'
})
export class AssignementDetailComponent {
  role=localStorage.getItem('role');
  note="";
  rem="";
  temp_id="";
  myAssignment: Assignment | undefined ;
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private assignmentService: AssignmentService,private router:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" ){
      const id = this.route.snapshot.paramMap.get('id')?? '';
      this.temp_id = this.route.snapshot.paramMap.get('id_etu')?? '';
      this.assignmentService.getOne(id,this.temp_id).subscribe(
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
      this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
    });
  }
  home():void{
    this.router.navigate(['/home']);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }
  Noter(id:number):void{
    this.assignmentService.noter(id, this.note,this.rem,this.temp_id).subscribe((reponse) => {
      console.log(reponse);
      this.router.navigate(['/dash']);
    }, error => {
      this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
    });
  }
}
