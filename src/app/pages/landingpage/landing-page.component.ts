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

import { Coach } from '../../types';
import { CoachService } from '../../services/coach-service/coach.service';
import { ViewportScroller } from '@angular/common';

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

  public coachList: Coach[];
  public firstFourCoach: Coach[];

  public showLess: boolean = true;
  public showSwitchText: string = "View All"

  constructor(private coachService: CoachService, private scroller: ViewportScroller){
    this.coachService.getCoaches().subscribe((res) => {
      this.coachList = res; console.log(this.coachList)
      this.firstFourCoach = this.coachList.slice(0, 4);
    });
    
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

  goToCoaches(){
    this.scroller.scrollToAnchor("coachSection");
  }

  onShowSwitch(){
    console.log(this.showLess)
    this.showLess = !this.showLess;
    this.showSwitchText = this.showLess? "View All" : "Show Less"
  }
  
  selected: Date | null;
  title = 'davana-healing';

}
