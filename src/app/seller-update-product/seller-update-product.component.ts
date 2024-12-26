import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  updateProductMsg: string | undefined;
  updateProductForm!: FormGroup;
  productId: any;
  productArray: any = [CommonModule];
  constructor( private router:Router, private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductService) {

    this.updateProductForm = this.fb.group({
      name: [''],
      price: [''],
      category: [''],
      color: [''],
      description: [''],
      img: [''],
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.getProductByProductId(this.productId).subscribe((result) => {
          this.productArray = result;
          // console.warn(this.productArray)
          this.updateProductForm.patchValue({
            name: this.productArray.name,
            price: this.productArray.price,
            category: this.productArray.category,
            color: this.productArray.color,
            description: this.productArray.description,
            img: this.productArray.img,
          })
        })
      }
    });
  }

  updateProduct() {
    if (this.productArray) {
      this.productService.updateUserProduct(this.productArray.id, this.updateProductForm.value).subscribe((result) => {
        // console.log("Updated Product" , result)
        if (result) {
          this.updateProductMsg = 'Product Update Successfully';
          setTimeout(() => {
            this.updateProductMsg = undefined;
            this.router.navigate(["seller-home"])
          }, 500);
        }
      })
    }
  }

}
