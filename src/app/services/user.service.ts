import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from '../sign-up';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/users";
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    return this.http.post(this.url, user, { observe: 'response' }).subscribe((result: any) => {
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.body));
        this.router.navigate(['home'])
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem("user")) {
      this.router.navigate(['/'])
    }
  }

  userLogin(user: login) {
    return this.http.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body?.length) {
        localStorage.setItem("user", JSON.stringify(result.body));
        this.router.navigate(['home'])
        this.invalidUserAuth.emit(false);
      } else {
        this.invalidUserAuth.emit(true);
      }

    })
  }
}
