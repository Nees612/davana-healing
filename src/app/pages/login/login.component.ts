import { Component, OnInit } from "@angular/core";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { UserService } from "../../services/user-service/user.service";
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { merge } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatInputModule } from "@angular/material/input";
import {MatSnackBar} from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule],
  providers: [
    CookieService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  errorMessage = '';

  constructor(
    private userService: UserService,
    private cookieService: CookieService, 
    private router: Router,
    private jwtHelper: JwtHelperService, 
    private _snackBar: MatSnackBar ) {
    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {}

  login(){    
    if (this.email.valid && this.password.valid && this.email.value != null && this.password.value != null){
      this.userService.login({Emailaddress: this.email.value, PasswordHash: this.password.value}).subscribe(
        {
          next: (res) => 
            {
              let decodedToken = this.jwtHelper.decodeToken(res);              
              let userName = decodedToken.name;

              this.cookieService.set("auth", res, undefined, "/");              
              this.cookieService.set("name", userName, undefined, "/");
              this.router.navigate(['/']).then(() => {this._snackBar.open("Login Succesfull!", "Nice!", {
                horizontalPosition: "center",
                verticalPosition: "top",
              });})
            },
          error: (err) => {this.cookieService.set("auth", ""); this._snackBar.open("Authentication Failed. Try again later...:(", "Nice!", {
            horizontalPosition: "center",
            verticalPosition: "top",
          });}
        }
      )
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
}
