import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  userSignUpForm!: FormGroup;
  userLoginForm!: FormGroup;
  showLogin: boolean = true;
  userAuthError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userSignUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(5)]
    })

    this.userLoginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(5)]
    })

  }

  noOnInit() {
    this.userService.userAuthReload();
  }

  submitUserSignUpForm() {
    if (this.userSignUpForm.valid) {
      console.warn(this.userSignUpForm.value);
      this.userService.userSignUp(this.userSignUpForm.value);
    }
  }

  submitUserLoginForm() {
    this.userService.userLogin(this.userLoginForm.value)
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.userAuthError = "User not Found!"
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
