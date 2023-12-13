import { Component, Renderer2 } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { product } from '../../core/interface/product';
import { CartService } from '../../core/cart.service';
import {WishlistService} from '../../core/wishlist.service';
import { Category } from '../../core/interface/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  wishList! : string []
  allProducts!:product[];
  categories : Category [] = []
  total!:number;
  currentPage:number=1;
  pageSize:number=1;
    constructor(private _ProductService:ProductService ,private _WishlistService:WishlistService,
      private _CartService:CartService,
       private _toaster:ToastrService,
       private _Renderer2:Renderer2){}  
         categoryOptions: OwlOptions = {
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
      responsive: {
        0: {
          items: 2
        },
        400: {
          items: 3
        },
        740: {
          items: 4
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
    pageChanged(event:any):void{
      this._ProductService.getAllProducts(event).subscribe({
        next:(res)=>{
      console.log(res);
      this.allProducts=res.data
      this.total=res.results
      this.currentPage=res.metadata.currentPage
      this.pageSize=res.metadata.limit
      
        },
        error:(err)=>{
      console.log(err);
      
        }
      })
    }
    mainSlideOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:true,
      autoplayTimeout:5000,
      autoplaySpeed:1000,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
     items:1,
      nav: false
    }
    ngOnInit(): void {
      localStorage.setItem("currentpage","/home")
      document.querySelector("#modal")?.remove();
      document.querySelector(".modal")?.remove();
      document.querySelector('.modal-backdrop')?.remove();
      document.querySelector( 'body' )?.classList.remove("modal-open");
     // document.body.classList.add("overflowY-auto")*/
  this._ProductService.getAllProducts().subscribe({
    next:(res)=>{
  this.allProducts=res.data
  this.total=res.results
  this.currentPage=res.metadata.currentPage
  this.pageSize=res.metadata.limit
    },
    error:(err)=>{
  console.log(err);
    }
  })
  this._WishlistService.getAllWishList().subscribe({
    next:(res)=>{
      const newData=res.data.map((item:any)=> item._id)
      this.wishList=newData
    },
    error:(err)=>{
    }
  })
  
  this._ProductService.getCategory().subscribe({
    next:(res)=>{
      console.log("category",res);
      this.categories=res.data
      
        },
        error:(err)=>{
      console.log(err);
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
        },
        error:(err)=>{
          console.log(err);
          this._Renderer2.removeAttribute(element,'disabled')
          this._toaster.error((err.error.message))
        }
      })
    }
  
    addWishList(pId :string):void{    
      this._WishlistService.addToWishList(pId).subscribe({
        next:(res)=>{
          this._WishlistService.numOfItems.next((res.data).length)
          console.log(res)
          console.log(this._WishlistService.numOfItems)
          this.wishList=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  
  }
  
