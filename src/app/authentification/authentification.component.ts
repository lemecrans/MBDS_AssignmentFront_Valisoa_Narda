import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  pseudo=''
  mdp=''
  errorMessage!: string;

  constructor(private authenticationService: AuthenticationService,
    private router:Router,private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['message'];
    });
  }

  onSubmit(event: any) {
    if((this.pseudo == '') || (this.mdp === '')) return;
  
      this.authenticationService
        .log(this.pseudo,this.mdp)
        .subscribe((reponse) => {
          console.log(reponse);
          localStorage.setItem('token', reponse.token);
          localStorage.setItem('ID', reponse.userId);
          localStorage.setItem('pseudo', this.pseudo);
          this.router.navigate(['/home']);
        }, error => {
          this.router.navigate(['/'], { queryParams: { message: "Pseudo ou mots de passe incorrecte, merci de réessayer!" } });
        });
    }
}
