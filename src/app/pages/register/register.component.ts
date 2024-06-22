import { Component, OnInit, signal } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../services/user-service/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { merge } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { User, Credentials } from '../../types';


@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {

  isSubmitDisabled = signal(true);
  passwordsMatch : boolean;

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(20)]);  
  phoneNumber = new FormControl('', [Validators.pattern('^[- +()0-9]+$')])
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordAgain = new FormControl('', [Validators.required]);

  errorMessageEmail = '';
  errorMessagePassword = 'Passwords do not match!';
  
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) 
  {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Not a valid email';
    } else {
      this.errorMessageEmail = '';
    }
  }

  inputChanged(event: Event){
    let fieldsContainData = this.firstName.invalid 
                            || this.lastName.invalid
                            || this.email.invalid 
                            || this.password.invalid ;

    console.log('asdasds');
    console.log(fieldsContainData)
    this.isSubmitDisabled.set(fieldsContainData);
    event.stopPropagation();
  }

  passwordChanged(event: Event){
    this.inputChanged(event);
    if (!(this.password.value == this.passwordAgain.value)){
      this.passwordAgain.setErrors({'passwordsDoNotMatch': true});    
    }else{
      this.passwordAgain.setErrors(null);    
    }

  }

  register(){
    if (
        this.firstName.valid 
        && this.lastName.valid 
        && this.email.valid
        && this.phoneNumber.valid
        && this.password.valid
        && this.passwordAgain.valid
        && this.firstName.value != null 
        && this.lastName.value != null
        && this.email.value != null        
        && this.password.value !=null
        && this.passwordAgain.value != null
        ){
      this.userService.register({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        emailAddress: this.email.value,
        passwordHash: this.password.value,
        phoneNumber: this.phoneNumber.value ?? ''
      }).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });
    }
  }

  

}
