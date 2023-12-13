import { Component,Renderer2 } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { product } from '../../core/interface/product';
import { CartService } from '../../core/cart.service';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProducts!:product[];
  term!:string
  pageSize:number=0;//limit
  CurrentPage:number=1
  total:number=0
  constructor(private _ProductService:ProductService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _toaster:ToastrService){

  }
  ngOnInit(): void {
    localStorage.setItem("currentpage","/products")
   // document.body.classList.add("overflowY-auto")*/
    this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
    this.pageSize=res.metadata.limit
    this.allProducts=res.data
    this.CurrentPage=res.metadata.currentPage
    this.total=res.result
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

        
      }
    })
  }
  pageChanged(event:any):void{
    this._ProductService.getAllProducts(event).subscribe({
      next:(res)=>{
    this.pageSize=res.metadata.limit
    this.allProducts=res.data
    this.CurrentPage=res.metadata.currentPage
    this.total=res.result
    console.log(event)
  },
  error:(err)=>{
    console.log(err);

  }
})
  }

}
