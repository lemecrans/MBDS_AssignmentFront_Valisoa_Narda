import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,

  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  pseudo=''
  mdp=''
  constructor(private authenticationService: AuthenticationService,
    private router:Router) {}

  onSubmit(event: any) {
    if((this.pseudo == '') || (this.mdp === '')) return;
  
      this.authenticationService
        .log(this.pseudo,this.mdp)
        .subscribe((reponse) => {
          console.log(reponse);
          localStorage.setItem('token', reponse.token);
          this.router.navigate(['/home']);
        }, error => {
          this.router.navigate(['/erreur']);
        });
    }
}
