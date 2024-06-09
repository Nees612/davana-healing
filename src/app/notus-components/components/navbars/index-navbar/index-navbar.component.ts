import { Component, OnInit } from "@angular/core";
import { IndexDropdownComponent } from "../../dropdowns/index-dropdown/index-dropdown.component";
import { CommonModule } from "@angular/common";
import { Router, RouterModule, EventType } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from "../../../../services/user-service/user.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: "app-index-navbar",
  standalone: true,
  imports: [IndexDropdownComponent, CommonModule, RouterModule],
  providers: [CookieService],
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  public userHasToken: boolean = false;
  public userName: string;

  constructor(
    private cookieService: CookieService, 
    private userService: UserService, 
    private router: Router,
    private _snackBar: MatSnackBar) {    
    router.events.subscribe((val) => {
      if(val.type == EventType.NavigationEnd){
        this.checkToken();
      }
    });
  }

  ngOnInit(): void {    
    this.checkToken();
  }

  private checkToken(){
    let bearerToken = `Bearer ${this.cookieService.get("auth")}`;
    this.userService.isUserLoggedIn(bearerToken).subscribe(
      {
        next: (res) => 
          {
            this.userHasToken = res;
            this.userName = this.getUserName();
          },
        error: () => 
          {
            this.userHasToken = false;
            this.userName = "";
          }
      });
  }

  private getUserName(): string{
    return this.cookieService.get("name");
  }

  logOut(){
    this.cookieService.deleteAll("/");
    this.router.navigate(['/']).then(() => {this._snackBar.open("Log out succesfull!", "Nice!", {
      horizontalPosition: "center",
      verticalPosition: "top",
    });});
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
