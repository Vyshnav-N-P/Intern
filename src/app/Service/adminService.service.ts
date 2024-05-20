import { Injectable } from "@angular/core";
import axios from "axios";
@Injectable({
    providedIn: 'root'
})
export class adminService{
    constructor(){}
    async deleteUser(userid:number){
        try {
            let userId=userid;
            const response=await axios.delete(`http://localhost:5000/remove/${userId}`,);
            if (response.status===200){
                console.log("deleted Successfully");
                window.location.reload();   
            }
        } catch (error) {
            console.log(error)
        }
    }


}