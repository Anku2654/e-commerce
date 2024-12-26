import { ProductService } from './../services/product.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { product } from '../sign-up';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartCount: number = 0;
  // searchResult: undefined | product;
  constructor(private route: Router, private productService: ProductService) {

  }

  ngOnInit() {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller") && val.url.includes("seller")) {
          let sellerStore: any = localStorage.getItem("seller");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        }
        else if (localStorage.getItem("user")) {
          let userStore: any = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore)[0];
          console.log("userData", userData)
          this.userName = userData.name;
          this.menuType = "user";
        }
        else {
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartCount = JSON.parse(cartData).length;
    }
    this.productService.cartItem.subscribe((result) => {
      this.cartCount = result.length === 0 ? 1 : result.length;
    })

  }

  logOutSeller() {
    localStorage.removeItem("seller");
    this.route.navigate(['/'])
  }

  logOutUser() {
    localStorage.removeItem("user");
    this.route.navigate(['user-auth'])
  }

  // searchProduct(query: KeyboardEvent) {
  //   if (query) {
  //     const element = query.target as HTMLInputElement;
  //     console.warn(element.value);
  //     this.productService.searchProduct(element.value).subscribe((result: any) => {
  //       console.warn(result);
  //       this.searchResult = result; 
  //     })
  //   }
  // }

}
