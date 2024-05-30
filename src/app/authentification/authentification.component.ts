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
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';


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
    private router:Router,private route: ActivatedRoute , private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.face=1;
    console.log(this.face)
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'];
    });
  }
 /* openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }*/
  openSnackBar(message: string, action: string, position: { vertical: 'top' | 'bottom', horizontal: 'start' | 'center' | 'end' }) {
    let config = new MatSnackBarConfig();
    config.duration = 5000;  // durée  en millisecondes
    config.verticalPosition = position.vertical;
    config.horizontalPosition = position.horizontal;

    this._snackBar.open(message, action, config);
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
          let message = "Pseudo ou mots de passe incorrecte, merci de réessayer!" ;
          this.openSnackBar(message, "ok", { vertical: 'top', horizontal: 'center' });
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
            let message = "Pseudo ou mots de passe incorrecte, merci de réessayer!" ;
            this.openSnackBar(message, "ok", { vertical: 'top', horizontal: 'center' });
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
