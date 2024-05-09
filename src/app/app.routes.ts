import { Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { AssignementDetailComponent } from './assignement-detail/assignement-detail.component';


export const routes: Routes = [
    { path: '', component: AuthentificationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'erreur', component: HomeComponent },
    { path: 'assignment-detail/:id', component: AssignementDetailComponent },

];
