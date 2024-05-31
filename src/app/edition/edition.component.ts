import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Student } from '../models/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Prof } from '../models/prof';

@Component({
  selector: 'app-edition',
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
  templateUrl: './edition.component.html',
  styleUrl: './edition.component.css'
})
export class EditionComponent {
  myStu: Student | undefined;
  myPro: Prof | undefined;
  errorMessage: string | null = null;
  action='0';
  face='1';
  
  constructor(private route: ActivatedRoute, private admi : AdminService,private router:Router) {}

  ngOnInit(): void {
    //if(localStorage.getItem('pseudo') && localStorage.getItem('pseudo')!="" ){
      const id = this.route.snapshot.paramMap.get('id')?? '';
      this.face = this.route.snapshot.paramMap.get('face')?? '';
      if(this.face=='1'){
        this.admi.getOneStu(id).subscribe(
          res => {
            this.myStu = res;
          },
          error => {
            this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
          }
        );
      }else{
        this.admi.getOneProf(id).subscribe(
          res => {
            this.myPro = res;
          },
          error => {
            this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
          }
        );
      }
      
    //}else{
      //this.router.navigate(['']);
    //}
  }
  onSubmit(event: any): void {
    if (this.action === '1' && this.myStu) {
      this.admi.updateStu(this.myStu._id,this.myStu).subscribe(
        res => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
    } if (this.action === '2' && this.myStu) {
      this.admi.deleteStu(this.myStu._id).subscribe(
        res => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
    }
  }
  onSubmit2(event: any): void {
    if (this.action === '1' && this.myPro) {
      this.admi.updatePro(this.myPro._id,this.myPro).subscribe(
        res => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
    } if (this.action === '2'&& this.myPro) {
      this.admi.deletePro(this.myPro._id).subscribe(
        res => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.router.navigate(['/erreur'], { queryParams: { message: "Une erreur s'est survenue, merci de réessayer ultérieurement!" } });
        });
    }
  }
  home():void{
    this.router.navigate(['/admin']);
  }
  logout():void{
    localStorage.clear();
    this.router.navigate(['']);
  }
}
