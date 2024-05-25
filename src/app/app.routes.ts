import { Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { AssignementDetailComponent } from './assignement-detail/assignement-detail.component';
import { ErreurComponent } from './erreur/erreur.component';


export const routes: Routes = [
    { path: '', component: AuthentificationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'erreur', component: ErreurComponent },
    { path: 'assignment-detail/:id', component: AssignementDetailComponent },

];
