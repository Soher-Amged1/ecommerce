import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';

interface registerinterface{
  name:string,
  email:string,
  password:string,
  rePassword:string,
  phone:string
  }
  
  interface logininterface{
    email:string,
  password:string
  }
  
  interface Emailinterface{
    email:string
  }
  
  
  interface Codeinterface{
    resetCode:string
  }
  
  
  interface ResetPasswordinterface{
    email:string,
    newPassword:string
  }
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    userDataSharedVar:BehaviorSubject <any> = new BehaviorSubject(null);
    baseUrl:string="https://ecommerce.routemisr.com";
    constructor(private _HttpClient:HttpClient, private _Router:Router) { 
     if (localStorage.getItem==null){
      _Router.navigate(['/login'])
     }
     else if(window.location.pathname=="/allorders"){
      this.saveData()
      _Router.navigate([localStorage.getItem("currentpage")])
     }
     else{
      this.saveData()
      _Router.navigate([localStorage.getItem("currentpage")])
     }
  
  
    }
    SendRegister(registerDate:registerinterface): Observable <any> 
    {
  return this._HttpClient.post(this.baseUrl+"/api/v1/auth/signup",registerDate)
    }
    SendLogin(LoginDate:logininterface): Observable <any> 
    {
  return this._HttpClient.post(this.baseUrl+"/api/v1/auth/signin",LoginDate)
    }
    SendEmail(EmailDate:Emailinterface): Observable <any> 
    {
  return this._HttpClient.post(this.baseUrl+"/api/v1/auth/forgotPasswords",EmailDate)
    }
    verifyCode(CodeDate:Codeinterface): Observable <any> 
    {
  return this._HttpClient.post(this.baseUrl+"/api/v1/auth/verifyResetCode",CodeDate)
    }
  
    ResetNewPassword(newpasswordDate:ResetPasswordinterface): Observable <any> 
    {
      /////put for update in exist data
  return this._HttpClient.put(this.baseUrl+"/api/v1/auth/resetPassword",newpasswordDate)
    }
    ///call
  saveData(){
    this.userDataSharedVar.next(localStorage.getItem("userToken"))
    if(this.userDataSharedVar.getValue()!=null){
      this.userDataSharedVar.next( jwtDecode(this.userDataSharedVar.getValue()))
    }
    else{
      this.userDataSharedVar.next(null)
    }
  }
  }
  