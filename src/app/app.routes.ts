import { Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { AssignementDetailComponent } from './assignement-detail/assignement-detail.component';
import { ErreurComponent } from './erreur/erreur.component';
import { AjoutComponent } from './ajout/ajout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', component: AuthentificationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'erreur', component: ErreurComponent },
    { path: 'ajout', component: AjoutComponent },
    { path: 'assignment-detail/:id/:id_etu', component: AssignementDetailComponent },
    { path: 'dash', component: DashboardComponent },

];