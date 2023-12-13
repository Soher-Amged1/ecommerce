import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Brands } from '../../core/interface/brands';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService){

}
pId!:string;
pInfo!:Brands;
errMessage!:string;
ngOnInit(): void {
  this.pId=this._ActivatedRoute.snapshot.params['bId'];
console.log(this._ActivatedRoute.snapshot.params['bId']);
  this._ProductService.getSpecificBrand(this.pId).subscribe({
    next:(res)=>{
  
      this.pInfo=res.data
    },
    error:(err)=>{
      console.log(err.error.message);
      this.errMessage=err.error.message
    }
  })
}
}
