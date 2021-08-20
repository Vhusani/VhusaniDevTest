import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('home');
    this.service.formModel.reset();
  }

  Fwlogin(){
    this.router.navigateByUrl('/login');
  }

  onRegister() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Account has been created', 'Registration successful');
          this.router.navigateByUrl('/login');
        } else {
          res.errors.forEach((element: any) => { 
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username already exists', 'Registration Failed');
                break;
              default:
                this.toastr.error(element.description, 'Registration Failed');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
