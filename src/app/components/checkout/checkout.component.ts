import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../core/checkout.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  cId!:string;
  constructor(private _ActivatedRoute:ActivatedRoute,private _CheckoutService:CheckoutService){

  }
checkoutForm:FormGroup=new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl('')
})
ngOnInit(): void {
  this.cId=this._ActivatedRoute.snapshot.params['cartId']
}
paySubmit():void{
  console.log(this.checkoutForm.value)
this._CheckoutService.pay(this.cId,this.checkoutForm.value).subscribe({
  next:(res)=>{
    console.log(res.session.url);
    window.location.href=res.session.url
  },
  error:(err)=>{
console.log(err);

  }
})

}
}
