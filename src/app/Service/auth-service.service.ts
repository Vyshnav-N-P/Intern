import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private router: Router,private cookieService:CookieService) {}

  isLoggedIn: boolean =false;
  Username:string ='';
  role:string='';
  userid:number=0;

  async Login(username:string,password:string){
    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { username:username, password:password },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        console.log(response.data);
//Creating Custom Cookies
        this.isLoggedIn=true;
        this.Username=response.data.user.username;
        this.role=response.data.user.Role;
        this.userid=response.data.user.userId;
        this.cookieService.set('User', username);
        this.cookieService.set('id', this.userid.toString());
        this.cookieService.set('Role', this.role);
//Route to profile page        
        this.router.navigate(['/profile']);

      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  async checkLogin() {
    try {
      const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
      if(response.status===200){
        this.isLoggedIn =true;
        this.Username=response.data.username;
        this.role=response.data.Role;
        this.userid=response.data.userId;
      }
    } catch (error) {
      console.error('Check login status error:', error);
      this.isLoggedIn = false;
    }
  }

  async register(username:string,email:string,password:string){
    try {
      console.log(username)
      const response=await axios.post('http://localhost:5000/register',{username:username,email:email,password:password})
      if(response.status=200)
        {
          console.log("Successfully registered");
          this.router.navigate(['/login'])
        }
    } catch (error) {
      console.log('Error:'+error)
    }
   }

  async logout(){
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        this.isLoggedIn = false;
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}