import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList: any = [];
  productDeleteMsg: string | undefined;
  constructor(private productService: ProductService, private route: Router) {

  }

  ngOnInit() {
    this.getUserProducts();
  }

  getUserProducts() {
    this.productService.getProduct().subscribe((result) => {
      console.log(result)
      if (result) {
        // console.log(result)
        this.productList = result;
      }
    })
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productDeleteMsg = "Product is Deleted"
        this.getUserProducts();
      }
    });
  }

  editProduct(id: any) {
    this.route.navigate([`/seller-update-product/${id}`])
  }

}
