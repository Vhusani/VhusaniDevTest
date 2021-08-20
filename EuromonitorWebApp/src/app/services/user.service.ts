import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../template/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  readonly BaseUrI = 'http://localhost:57589/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Firstname: ['', Validators.required],
    Lastname: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required]
    }, {
      Validator : this.comparePasswords
    })
  });

  comparePasswords(fb:FormGroup){
    let confirmPassCtrl = fb.get('ConfirmPassword');
    //passmismatch 
    if(confirmPassCtrl?.errors == null || 'passwordMismatch' in confirmPassCtrl.errors){
      if(fb.get('Password')?.value != confirmPassCtrl?.value)
      confirmPassCtrl?.setErrors({passwordMismatch: true});
      else
      confirmPassCtrl?.setErrors(null);
    }
  }

  getUserDetails(){
    //return this.http.get(this.BaseUrI + '/UserProfile');
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' });
    return this.http.get(this.BaseUrI + '/UserProfile', { headers: tokenHeader });
  }

  register(){
    var body = { 
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Firstname: this.formModel.value.Firstname,
      Lastname: this.formModel.value.Lastname,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseUrI + '/AppUser/Register', body);
  }

  login(formData:any){
    return this.http.post(this.BaseUrI + '/AppUser/Login', formData);
  }
  
  redirectTo(uri: string){
  this.router.navigate([uri])
    .then(() => {
      window.location.reload();
    });
  }

}
