import { Injectable } from '@angular/core';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root' 
})
export class ProductsService {

  Products: Product[] = [
    new Product(1,  "../../assets/book.png",  "Euromonitor book 1",  "Nothing hectic, just a test book, check it out",  435 ), 
    new Product(2,  "../../assets/book.png", "Euromonitor book 2",  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,",  530 ),
    new Product(3,  "../../assets/book.png", "Euromonitor book 3", "Nothing hectic, just a test book, check it out",  900 ),
    new Product(4,  "../../assets/book.png", "Euromonitor book 4", "Nothing hectic, just a test book, check it out",  245 )
  ];

  getProducts(){
    return this.Products;
  }

  getProduct(id:number){
    return this.Products.find(Product => Product.id === id);
  }

  constructor() { }
}
