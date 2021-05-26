import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public emailValue : any;
  public passwordValue : any;
  
  constructor(
    private router: Router,
    private loginService : LoginService,
    private spinner: NgxSpinnerService){ }
    
  login() {
    var auth = {
      "email" : this.emailValue,
      "password" : this.passwordValue
    }
    this.spinner.show();
    this.loginService.login(auth).subscribe(responseData => {
      this.spinner.hide();
      if(responseData.status.message === "Successfully logged"){
        this.router.navigate(['/dashboard']);
        localStorage.setItem("email", auth.email);
        localStorage.setItem('password',auth.password);
        localStorage.setItem('userName',responseData.data[0].name)
      }else if(responseData.status.message === "Invalid Credentials"){
        alert(responseData.status.message);
      }
    })
  }
} 

