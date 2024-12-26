import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, SignUp } from '../sign-up';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


  isLoginError = new EventEmitter<boolean>(false);
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  url: any = "http://localhost:3000/seller"

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(userData: any) {
    this.http.post<SignUp>(this.url, userData, { observe: 'response' }).subscribe((result) => {
      if (result) {
        localStorage.setItem("seller", JSON.stringify(result.body))
        console.table(result.body)
        this.router.navigate(["seller-home"]);
      }
    });
  }

  userLogin(loginData: login) {
    this.http.get(`http://localhost:3000/seller?email=${loginData.email}&password=${loginData.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length === 1) {
        this.isLoginError.emit(false);
        localStorage.setItem("seller", JSON.stringify(result.body))
        this.router.navigate(["seller-home"]);
      } else {
        this.isLoginError.emit(true);
      }
    })

  }

  reloadSeller() {
    if (localStorage.getItem("seller")) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(["seller-home"]);
    }
  }
}
