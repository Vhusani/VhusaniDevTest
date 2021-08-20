import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product: Product[] = [];
  grandTotal!: number;

  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null)
    this.router.navigateByUrl('login');
    this.cartService.getProducts().subscribe(res=>{
      this.product = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  checkout(){
    this.toastr.success('Congratulations, Thanks for the support', 'Checkout Successful');
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
}
