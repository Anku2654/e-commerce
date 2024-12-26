import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { login, SignUp } from '../sign-up';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  signUpForm!: FormGroup;
  loginForm!: FormGroup;
  showLogin: boolean = false;
  authErro: string = ''

  constructor(private fb: FormBuilder, private sellerService: SellerService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(5)],
    })

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(5)],
    })
  }

  ngOnInit() {
    this.sellerService.reloadSeller();
  }

  submitSignUpForm(): void {
    const user = new SignUp();
    user.name = this.signUpForm.get('name')?.value;
    user.email = this.signUpForm.get('email')?.value;
    user.password = this.signUpForm.get('password')?.value;
    this.sellerService.userSignUp(user);
  }

  submitLoginForm() {
    const user = new login;
    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;
    this.sellerService.userLogin(user);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authErro = "Email or password is not correct"
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
