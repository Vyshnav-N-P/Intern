import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { NgFor ,NgIf} from '@angular/common';
import axios from 'axios';
import { adminService } from '../../Service/adminService.service';
import { AuthServiceService } from '../../Service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import {userFunctionsService} from '../../Service/userFunctions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarComponent,NgFor,NgIf,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
isAdmin:boolean=false;
users:any[]=[];
searchbar:string='';

constructor(private adminService:adminService,private authService:AuthServiceService,private cookieService:CookieService,private userService:userFunctionsService){
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
      console.log(response.data);
      
    }
  } catch (error) {
    console.log(error);
    
  }
}
async deleteUser(userid:number) {
  this.adminService.deleteUser(userid);
}
async searchUser(){
  console.log(this.searchbar);
  
  if(this.searchbar !=''){
    this.userService.searchUser(this.searchbar)
    this.users=this.userService.searchresult;
}
  else{
    this.loadUser()
  }
}
}