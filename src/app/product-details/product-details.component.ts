import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {  CommonModule } from '@angular/common';
import { cart, product } from '../sign-up';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId: any;
  productData: any;
  productQuantity: number = 1;
  removeCart: boolean = false;
  constructor(private route: ActivatedRoute, private productService: ProductService, ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.productService.getProductByProductId(this.productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (cartData && this.productId) {
          let items = JSON.parse(cartData);
          console.warn(items)
          items = items.filter((item: product) => item.id === this.productId);
          console.log("5555", items)
          if (items) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      })
    });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
      }
    }
  }

  removeToCart(id: any) {
    this.removeCart = true;
    this.productService.removeItemFromCart(id)
  }


}
