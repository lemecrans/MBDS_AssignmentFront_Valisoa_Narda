import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,MatSlideToggleModule,
            RouterOutlet,RouterLink
  ],
})
export class SidenavComponent implements OnDestroy {
  @Input() page_title: any;
  //code  venant de https://material.angular.io/components/sidenav/examples 
  //pour les fonctionnalites de base sidenav
  //avec quelques modifications pour l'integrer dans notre use case
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(private authService:AuthService,private router:Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  //shouldRun = true// /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  login() {
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }
}
