import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts: any;
  treandyProducts: any;
  constructor(private porductService: ProductService) {

  }

  ngOnInit() {
    this.getPopularProducts();
    this.getTrendyProduts();
  }

  getPopularProducts() {
    this.porductService.popularProduct().subscribe((result) => {
      this.popularProducts = result;
    })
  }

  getTrendyProduts() {
    this.porductService.popularProduct().subscribe((result) => {
      this.treandyProducts = result;
    })
  }

}
