import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { NgFor ,NgIf} from '@angular/common';
import axios from 'axios';
import { adminService } from '../../Service/adminService.service';
import { AuthServiceService } from '../../Service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarComponent,NgFor,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
isAdmin:boolean=false;
users:any[]=[];

constructor(private adminService:adminService,private authService:AuthServiceService,private cookieService:CookieService){
  this.loadUser();
  this.checkAdmin();
}

checkAdmin(){
  if(this.cookieService.get('Role')=='Admin')
    {this.isAdmin=true;}
  else{
    this.isAdmin=false;
  }
}
async loadUser(){
  try {
    const response=await axios.get('http://localhost:5000/listusers');
    if (response.status===200){
      this.users=response.data;
    }
  } catch (error) {
    console.log(error);
    
  }
}
deleteUser(userid:number) {
  this.adminService.deleteUser(userid);
}
}