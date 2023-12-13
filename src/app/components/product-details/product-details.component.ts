import { Component ,Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/product.service';
import{product}from'../../core/interface/product'
import { CartService } from '../../core/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService,private _toaster:ToastrService,
    private _CartService:CartService,private _Renderer2:Renderer2){
}
pId!:string;
pInfo!:product;
errmessage!:string
productOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  navSpeed: 700,
  navText: ['', ''],
 items:1,
  nav: false
}

ngOnInit(): void {
this.pId=this._ActivatedRoute.snapshot.params['hamada'];
console.log(this._ActivatedRoute.snapshot.params['hamada']);
this._ProductService.getSpecProduct(this.pId).subscribe({
  next:(res)=>{

    this.pInfo=res.data
    console.log(this.pInfo)
  },
  error:(err)=>{
    console.log(err);
    this.errmessage=err.error.message
  }
})
}
addCartClick(pId :string,element:HTMLButtonElement){
  this._Renderer2.setAttribute(element,'disabled','true')

  this._CartService.addToCart(pId).subscribe({
    next:(res)=>{
      this._toaster.success(res.message)
        this._Renderer2.removeAttribute(element,'disabled')
      this._CartService.numOfItems .next(res.numOfCartItems)

    },
    error:(err)=>{
      console.log(err);
      this._Renderer2.removeAttribute(element,'disabled')

      
    }
  })
}
}

