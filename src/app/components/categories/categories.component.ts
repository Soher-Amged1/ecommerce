import { Component } from '@angular/core';
import { Category } from '../../core/interface/category';
import { ProductService } from '../../core/product.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories : Category [] = []
  errMessage!:string
  constructor(private _ProductService:ProductService){
  }
  ngOnInit(): void {
    localStorage.setItem("currentpage","/categories")
    this._ProductService.getCategory().subscribe({
      next:(res)=>{
        this.categories=res.data
        
          },
          error:(err)=>{
        console.log(err.message);
        this.errMessage=err.error.message
          }
    })
  }

}

