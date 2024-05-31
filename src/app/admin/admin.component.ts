import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Student } from '../models/student';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Prof } from '../models/prof';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatGridListModule,
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  pseudo=''
  mdp=''
  errorMessage!: string;
  face=1;
  listeStu : Student[] = []
  listePro : Prof[]= []
  displayedColumns: string[] = ["ID", "Pseudo", "Nombre d'assignments"];
  displayedColumns2: string[] = ["ID", "Nom", "Mail","Photo"];


  constructor(private admi: AdminService,
    private router:Router,private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.face=1;
  }
  onSubmitStudent(event: any) {
    if((this.pseudo == '') || (this.mdp === '')) return;
      this.admi.log(this.pseudo,this.mdp)
        .subscribe((reponse) => {
          localStorage.setItem('token', reponse.token);
          localStorage.setItem('ID', reponse.userId);
          localStorage.setItem('pseudo', this.pseudo);
          localStorage.setItem('role', "admin");
          this.face=2;
          this.admi.getAllStudent().subscribe((reponse : Student[])=>{
            this.listeStu=reponse;
          })
          this.admi.getAllProf().subscribe((reponse : Prof[])=>{
            this.listePro=reponse;
          })
        }, error => {
          this.router.navigate(['/'], { queryParams: { message: "Pseudo ou mots de passe incorrecte, merci de réessayer!" } });
        });
    }
  onSelect(stu: Student): void {
    this.router.navigate(['/edit',stu._id,1]);
  }
  onSelect2(pro: Prof): void {
    this.router.navigate(['/edit',pro._id,2]);
  }
  ajout():void{
    //this.router.navigate(['/ajout']);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }
}
