import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
  }
  user = new Subject();
  LoginUser!:any;
  createuser(data:any){
    return this.http.post(`${environment.baseUrl}users` , data)
  }

  login(data:any){
    this.LoginUser = data
    localStorage.setItem('LoginUser' , JSON.stringify(this.LoginUser))
    return this.http.put(`${environment.baseUrl}login/1` , data);

  }
  logOut(data:any){
    localStorage.removeItem("LoginUser");
    return this.http.put(`${environment.baseUrl}login/1` , data)
  }
  
  getAllUsers(roles:any){
    return this.http.get(`${environment.baseUrl}${roles}`)
  }
  getUser(id:number){
    return this.http.get(`${environment.baseUrl}users/${id}`)
  }

  updateUser(id:number , data:any){
    return this.http.put(`${environment.baseUrl}users/${id}` , data)
  }

  getRole(){
    return this.http.get(`${environment.baseUrl}login/1`)
  }

}
