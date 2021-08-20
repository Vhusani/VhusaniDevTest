import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  }

  constructor(private service: UserService, private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('home');
  }

  Fwlogin(){
    this.router.navigateByUrl('/register')
  }
  
  onLogin(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
         this.service.redirectTo('/home')
      },
        err => {
          if(err.status == 400){
            this.toastr.error('Incorrect Username or Password', 'Login Failed');
          }
          else{
            console.log(err)
          }
        }
    )
  }

}
