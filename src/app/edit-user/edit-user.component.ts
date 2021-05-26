import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserService } from './edit-user.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  ngOnInit() : void {
    var user = localStorage.getItem("email");
    if (!user) {
      this.router.navigate(["/"]);
    }
  }

  userData : any ;

  constructor(private EditUserService : EditUserService,
    private router : Router,
    private spinner: NgxSpinnerService)
    { 
      if (history && history.state && history.state.user) {
      this.userData = JSON.parse(history.state.user);
      console.log(this.userData.id)
    }
  }
  
  updateUser(){
    console.log(this.userData.id);
    console.log(this.userData.name);
    console.log(this.userData.email);
    console.log(this.userData.status);
    console.log(this.userData.roleName);

    var updateUserInfo = {
      "email" : this.userData.email,
      "name" : this.userData.name,
      "mobile" : this.userData.mobile,
      "isActive" : this.userData.status,
      "roleId" : this.userData.roleId,
      "password" : localStorage.getItem("password")
    }
    this.spinner.show();
    this.EditUserService.updateUser(updateUserInfo).subscribe(ResponseData => {
      this.spinner.hide();
      console.log(ResponseData)
        this.router.navigate(['/user']);
        console.log("this is working")
      })
  }
}






