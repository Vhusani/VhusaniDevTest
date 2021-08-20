import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Euromonitor"
  user: any;
  logo = "../../../assets/download.png"
  totalItems: number = 0;

  constructor(private service: UserService, private router: Router, private cartService: CartService) { }

  forward(url:any){
    this.router.navigate([url]);
  }

  ngOnInit(){
    this.service.getUserDetails().subscribe(
      res => {
        this.user = res;
      },
      err => {
        console.log(err);
      },
    );
    this.cartService.getProducts().subscribe(res=>{
      this.totalItems = res.length;
    })
  }

  onLogout(){
    localStorage.removeItem('token');
    this.service.redirectTo('/home')
  }
  
}
