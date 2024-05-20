import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import axios from 'axios';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../Service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username='';
  public isRemember='';
  public password='';

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  constructor(private authService: SocialAuthService,private router: Router,private http:HttpClient,private myauthService:AuthServiceService) { }
  user:any;
  loggedIn:any;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });}

    async userLogin() {
      this.myauthService.Login(this.username,this.password);
    }
}
