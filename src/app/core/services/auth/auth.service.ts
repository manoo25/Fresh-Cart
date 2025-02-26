import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { UserData } from '../../../shared/interfaces/user-data';
import { Router } from '@angular/router';
import { UserInfo } from 'node:os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:UserData[]=[];
  private readonly router=inject(Router);

  constructor(private readonly httpClient:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  sendLoginForm(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }


  saveUserData():void{
    if(localStorage.getItem('userData') !==null){
  this.userData= jwtDecode(localStorage.getItem('userData')!)
  
  
    }
   
  }

  logOut():void{
    localStorage.removeItem('userData');
    localStorage.removeItem('userid')
    this.userData=[];
    this.router.navigate(['/login']);
    
  }

  sendVerifyEmail(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
   }
  getVerifyToken():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
   }
  sendVerifycode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
   }
  sendNewPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
   }

}


