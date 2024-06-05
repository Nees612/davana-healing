import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IndexNavbarComponent } from '../../notus-components/components/navbars/index-navbar/index-navbar.component';
import { FooterComponent } from '../../notus-components/components/footers/footer/footer.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { AuthNavbarComponent } from '../../notus-components/components/navbars/auth-navbar/auth-navbar.component';

import { UserService } from '../../services/user.service';
import { Credentials } from '../../types';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet,
    IndexNavbarComponent,
    AuthNavbarComponent,
    FooterComponent,
    RouterModule,
    MatCardModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatButtonModule,
    ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingComponent {

  constructor(private userService: UserService){}

  callUserLogin() {
    let creds:Credentials = {Emailaddress: "john.doe@example.com", PasswordHash: "hashed_password" }
    this.userService.login(creds).subscribe((res)=> console.log(res));
  }

  @ViewChild('staticNavbar') private testDiv: ElementRef;
  isVisible: boolean;

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){    
    if (this.testDiv){
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.isVisible = topShown && bottomShown;            
    }
  }
  
  selected: Date | null;
  title = 'davana-healing';

}
