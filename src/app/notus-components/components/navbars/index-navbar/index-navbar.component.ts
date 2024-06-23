import { Component, OnInit } from "@angular/core";
import { IndexDropdownComponent } from "../../dropdowns/index-dropdown/index-dropdown.component";
import { CommonModule } from "@angular/common";
import { Router, RouterModule, EventType } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from "../../../../services/user-service/user.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";

@Component({
  selector: "app-index-navbar",
  standalone: true,
  imports: [IndexDropdownComponent, CommonModule, RouterModule],
  providers: [
    CookieService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
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
    private _snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService) {    
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
    let tokenExp = null;
    try
    {
      tokenExp = this.jwtHelper.getTokenExpirationDate(bearerToken);
      if(tokenExp && tokenExp > new Date()){
        this.userHasToken = true;
        this.userName = this.getUserName();
      }else{
        this.userHasToken = false;
        this.userName = "";
      }
    }catch(e)
    {
      this.userHasToken = false;
      this.userName = "";
      return;
    }
     
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
