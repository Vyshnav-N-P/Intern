import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../Service/auth-service.service';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  isLogged:boolean=false;
  username:string;
  constructor(private authservice:AuthServiceService,private cookieService:CookieService){
  
    this.username=this.cookieService.get('User');
    if(this.username)
      {this.isLogged=true;}
    this.logIsLogged();
  }

  logIsLogged() {
    console.log(this.authservice.isLoggedIn);
    console.log(this.cookieService.getAll());
  }
  
}
