import { Component ,Renderer2} from '@angular/core';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  allPCart:any;
  deleteMessage:string=""
  totalPrice:string=""
  cartId!:string;
errormessage!:string;
  constructor(private _CartService:CartService,private _Renderer2:Renderer2){

  }
  ngOnInit(): void {
    localStorage.setItem("currentpage","/cart")
    this._CartService.getAllcart().subscribe({
      next:(res)=>{
      this.allPCart=res.data.products;
      this.totalPrice=res.data.totalCartPrice
      this.cartId=res.data._id
      },
      error:(err)=>{
      console.log(err.message);
      }
    })
    
  }
  deleteItemClick(pId:string,element:HTMLButtonElement){
    this._Renderer2.setAttribute(element,'disabled','true')

    this._CartService.removeItem(pId).subscribe({
      next:(res)=>{
        console.log(res);
        
        if(res.numOfCartItems==0){
          this.clearCart()
        }
else{
  
  this.totalPrice=res.data.totalCartPrice
  this.allPCart=res.data.products
  this._Renderer2.removeAttribute(element,'disabled')
  this._CartService.numOfItems.next(res.numOfCartItems)
}
        
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
        this.errormessage=err.error.message
      }
    })
  }
  updateCount(pId:string,count:number,element:HTMLButtonElement,element2:HTMLButtonElement){
    this._Renderer2.setAttribute(element,'disabled','true')
    this._Renderer2.setAttribute(element2,'disabled','true')

    if(count==0){
      this.deleteItemClick(pId,element)
      return;
    }
    this._CartService.updateToCart(pId,count).subscribe({
      next:(res)=>{
        this.allPCart=res.data.products
        this._Renderer2.removeAttribute(element,'disabled')
        this._Renderer2.removeAttribute(element2,'disabled')
        this.totalPrice=res.data.totalCartPrice

      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(element,'disabled')
        this._Renderer2.removeAttribute(element2,'disabled')
        this.errormessage=err.error.message
      }
          })
        }
  clearCart(){
this._CartService.clearCart().subscribe({
  next:(res)=>{
    if(res.message=="success"){
      this.deleteMessage="Cart Deleted Successfully"
      this.allPCart=null;
      this._CartService.numOfItems.next(0)
    }
  },
  error:(err)=>{
    this.errormessage=err.error.message

  }
})
        }
}
