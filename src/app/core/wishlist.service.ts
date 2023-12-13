import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BaseUrl :string="https://ecommerce.routemisr.com"
  numOfItems:BehaviorSubject<any>=new BehaviorSubject(null)
  mytoken:any={
   token:localStorage.getItem("userToken")
  }
   constructor(private _HttpClient:HttpClient ) { }
   
   getAllWishList() :Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/wishlist`,{headers:this.mytoken})
  }
 
 
   addToWishList(pId:string) :Observable<any> {
     let body={productId:pId}
     return this._HttpClient.post(`${this.BaseUrl}/api/v1/wishlist`,body,{headers:this.mytoken})
   }
  
 
 
   removeItem(pId:string) :Observable<any> {
     return this._HttpClient.delete(`${this.BaseUrl}/api/v1/wishlist/${pId}`,{headers:this.mytoken})
   }
 
 }

