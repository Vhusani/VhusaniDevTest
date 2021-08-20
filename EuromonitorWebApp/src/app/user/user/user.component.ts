import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo: any;

constructor(private service: UserService, private router: Router) { }

  ngOnInit() : void {
    if(localStorage.getItem('token') == null)
      this.router.navigateByUrl('login');
    this.service.getUserDetails().subscribe(
      res => {
        this.userInfo = res;
      },
      err => {
        console.log(err);
      },
    );
  }
}
