import { Component } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Brands } from '../../core/interface/brands';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  brands : Brands [] = []
  errMessage!:string;
  constructor(private _ProductService:ProductService){
    
  }
  ngOnInit(): void {
    localStorage.setItem("currentpage","/brands")
    this._ProductService.getBrands().subscribe({
      next:(res)=>{
        this.brands=res.data
        
          },
          error:(err)=>{
        console.log(err.message);
        this.errMessage=err.error.message
          }
    })
  }


}
