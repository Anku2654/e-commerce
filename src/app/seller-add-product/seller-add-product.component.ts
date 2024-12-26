import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../sign-up';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductForm!: FormGroup
  addProductMsg: string | undefined;
  constructor(private fb: FormBuilder, private productService: ProductService, private router:Router    
  ) {

  }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name: [''],
      price: [''],
      category: [''],
      color: [''],
      description: [''],
      img: ['']
    })
  }

  submitProduct() {
    const products = new product();
    products.name = this.addProductForm.get('name')?.value,
      products.price = this.addProductForm.get('price')?.value,
      products.category = this.addProductForm.get('category')?.value,
      products.color = this.addProductForm.get('color')?.value,
      products.description = this.addProductForm.get('description')?.value,
      products.img = this.addProductForm.get('img')?.value;

    this.productService.addProducts(products).subscribe((result) => {
      // console.log("Added Product", result)
      if (result) {
        this.addProductMsg = "Product added seccessfully";
        this.router.navigate(["seller-home"]);
      }
    });
    setTimeout(() => {
      this.addProductMsg = undefined;
    }, 3000);
  }

}
