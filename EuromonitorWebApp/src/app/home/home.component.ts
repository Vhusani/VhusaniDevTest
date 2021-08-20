import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInfo: any;
  Products: Product[] = [];
  
  constructor(private service: UserService, private router: Router,private cartService: CartService ,private productService: ProductsService) { }

  ngOnInit(){
    this.Products = this.productService.getProducts();
    this.Products.forEach((a:any)=>{
      Object.assign(a, {qty:1, total:a.price})
    });
    //get user details
    this.service.getUserDetails().subscribe(
      res => {
        this.userInfo = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  addToCart(item:any){
    this.cartService.addToCart(item); 
  }

  logIn(){
    this.router.navigateByUrl('login')
  }

}
