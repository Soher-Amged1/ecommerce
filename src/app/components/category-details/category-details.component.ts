import { Component } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Category } from '../../core/interface/category';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {

  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService){

}
errMessage!:string
pId!:string;
pInfo!:Category;
ngOnInit(): void {
  this.pId=this._ActivatedRoute.snapshot.params['cId'];
console.log(this._ActivatedRoute.snapshot.params['cId']);
  this._ProductService.getSpecificCategory(this.pId).subscribe({
    next:(res)=>{
      this.pInfo=res.data
    },
    error:(err)=>{
      console.log(err);
      this.errMessage=err.error.message

    }
  })
}
}
