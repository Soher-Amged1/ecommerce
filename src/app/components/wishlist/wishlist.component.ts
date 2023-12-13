import { Component,Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/wishlist.service';
import { product } from '../../core/interface/product';
import { CartService } from '../../core/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  allfav!: product [];
  wishList! : string []
  errormessage!:string
  constructor(private _WishlistService:WishlistService,private _CartService:CartService,private _toaster:ToastrService,
    private _Renderer2:Renderer2){

  }
ngOnInit(): void {
localStorage.setItem("currentpage","/wishlist")
    this._WishlistService.getAllWishList().subscribe({
      next:(res)=>{
        this.allfav=res.data;
      },
      error:(err)=>{
      console.log(err.message);
      }
    })
  
}
deletefromlist(pId:string,element:HTMLButtonElement){
  this._WishlistService.removeItem(pId).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishList=res.data
      const newProductData =this.allfav.filter((item:any)=> this.wishList.includes(item._id))
      this.allfav=newProductData

      
    },
    error:(err)=>{
      this.errormessage=err.error.message
    }
  })

}
addCartClick(pId :string,element:HTMLButtonElement):void{
  this._Renderer2.setAttribute(element,'disabled','true')
  this._CartService.addToCart(pId).subscribe({
    next:(res)=>{
      this._CartService.numOfItems .next(res.numOfCartItems)
      this._toaster.success(res.message)
      this._Renderer2.removeAttribute(element,'disabled')
     this. deletefromlist(pId,element)
    },
    error:(err)=>{
      console.log(err);
      this._Renderer2.removeAttribute(element,'disabled')
      this._toaster.error((err.error.message))
    }
  })
}
}

