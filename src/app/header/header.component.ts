import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userEmail : any;
  userName : any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userEmail =localStorage.getItem("email");
    var nameMatch = this.userEmail.match(/^([^@]*)@/);
     this.userName = localStorage.getItem("userName");

  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    this.router.navigate(["/"]);
  }

}
