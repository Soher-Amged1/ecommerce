import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  BaseUrl :string="https://ecommerce.routemisr.com"
  mytoken:any={
    token:localStorage.getItem("userToken")
   }


  constructor(private _HttpClient:HttpClient) { }
  pay(cId:string,formValue:object) : Observable <any> {
    let bodyPay:any={
      shippingAddress:formValue
    }
   return this._HttpClient.post(this.BaseUrl+`/api/v1/orders/checkout-session/${cId}?url=https://github.com/Soher-Amged1/Ecommerce`
    ,bodyPay,{headers:this.mytoken})
  }
}
