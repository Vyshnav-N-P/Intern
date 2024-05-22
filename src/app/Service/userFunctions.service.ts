import { Injectable } from "@angular/core";
import axios from "axios";
@Injectable({
    providedIn: 'root'
  })
  export class userFunctionsService {
    constructor(){}
    searchresult:any;
    async searchUser(search:string){
        try {            
            const response= await axios.get(`http://localhost:5000/search/${search}`,{withCredentials:true});
            if (response.status==200) {
                console.log(response.data);
                this.searchresult=response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
  }
  