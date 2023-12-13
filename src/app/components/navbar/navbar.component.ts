import { Component, ElementRef, HostListener, ViewChild,Renderer2 } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private _AuthService:AuthService,private _Router:Router,
    private _CartService:CartService,private _Renderer2:Renderer2)
  {
  
  }
  @ViewChild('navBar') navElement!:ElementRef
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY>500){
  
    this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
    this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
  
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
  
  
    }
  }
  islogin:boolean=false;
  navCartItem:string=""
  
  ngOnInit(): void {
   this._CartService.numOfItems.subscribe(()=>{
    if(this._CartService.numOfItems.getValue()==null){
      this.navCartItem= "0"
    }
    else{
      this.navCartItem=this._CartService.numOfItems.getValue()
    }
  
   })
   this._CartService.getAllcart().subscribe({
    next:(res)=>{
      this.navCartItem=res.numOfCartItems
    },
    error:(err)=>{
      this.navCartItem= "0"
    }
   })
  this._AuthService.userDataSharedVar.subscribe(()=>{
    if(this._AuthService.userDataSharedVar.getValue()==null){
      this.islogin=false
    }
    else{
      this.islogin=true
    }
  })
  }
  logout(){
    localStorage.removeItem("userToken");
    this._AuthService.saveData();
    this._Router.navigate(['/login'])
  }
  }
  
