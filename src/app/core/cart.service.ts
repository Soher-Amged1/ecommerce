import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BaseUrl :string="https://ecommerce.routemisr.com"
  numOfItems:BehaviorSubject<any>=new BehaviorSubject(null)
  mytoken:any={
   token:localStorage.getItem("userToken")
  }
   constructor(private _HttpClient:HttpClient ) { }
 
 
 
   addToCart(pId:string) :Observable<any> {
     let body={productId:pId}
     return this._HttpClient.post(`${this.BaseUrl}/api/v1/cart`,body,{headers:this.mytoken})
   }
 
 
   updateToCart(pId:string,pCount:number) :Observable<any> {
     let body={count:pCount}
     return this._HttpClient.put(`${this.BaseUrl}/api/v1/cart/${pId}`,body,{headers:this.mytoken})
   }
 
 
 
   getAllcart() :Observable<any> {
     return this._HttpClient.get(`${this.BaseUrl}/api/v1/cart`,{headers:this.mytoken})
   }
 
 
   removeItem(pId:string) :Observable<any> {
     return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart/${pId}`,{headers:this.mytoken})
   }
 
   
 clearCart() :Observable<any> {
   return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart`,{headers:this.mytoken})
 }
}
