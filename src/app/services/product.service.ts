import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../sign-up';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "http://localhost:3000/products"

  constructor(private http: HttpClient) { }
  cartItem = new EventEmitter<product[]>();
  addProducts(data: product) {
    return this.http.post(this.url, data);
  }

  getProduct() {
    return this.http.get(this.url);
  }

  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductByProductId(id: any) {
    return this.http.get(`http://localhost:3000/products/${id}`)
  }

  updateUserProduct(id: any, product: product) {
    return this.http.put(`http://localhost:3000/products/${id}`, product);
  }

  popularProduct() {
    return this.http.get(`http://localhost:3000/products?._limit=3`)
  }

  getTrendyProduct() {
    return this.http.get(`http://localhost:3000/products?._limit=3`)
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartItem.emit(cartData);
    }
  }

  removeItemFromCart(id: any) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => item.id === id!);
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartItem.emit(items);
    }
  }
}
