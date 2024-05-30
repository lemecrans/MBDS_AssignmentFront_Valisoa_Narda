import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  pseudo=''
  mdp=''
  errorMessage!: string;
  face=1;

  constructor(private authenticationService: AuthenticationService,
    private router:Router,private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.face=1;
    console.log(this.face)
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'];
    });
  }

  onSubmitStudent(event: any) {
    if((this.pseudo == '') || (this.mdp === '')) return;
  
      this.authenticationService
        .log(this.pseudo,this.mdp)
        .subscribe((reponse) => {
          console.log(reponse);
          localStorage.setItem('token', reponse.token);
          localStorage.setItem('ID', reponse.userId);
          localStorage.setItem('pseudo', this.pseudo);
          localStorage.setItem('role', "ETU");
          this.router.navigate(['/home']);
        }, error => {
          this.router.navigate(['/'], { queryParams: { message: "Pseudo ou mots de passe incorrecte, merci de réessayer!" } });
        });
    }
    onSubmitProf(event: any) {
      if((this.pseudo == '') || (this.mdp === '')) return;
    
        this.authenticationService.logprof(this.pseudo,this.mdp)
          .subscribe((reponse) => {
            console.log(reponse);
            localStorage.setItem('token', reponse.token);
            localStorage.setItem('ID', reponse.userId);
            localStorage.setItem('pseudo', this.pseudo);
            localStorage.setItem('role', "Prof");
            this.router.navigate(['/dash']);
          }, error => {
            this.router.navigate(['/'], { queryParams: { message: "Pseudo ou mots de passe incorrecte, merci de réessayer!" } });
          });
      }
  student(){
    this.face=1
  }
  prof(){
    this.face=2
  }
}
