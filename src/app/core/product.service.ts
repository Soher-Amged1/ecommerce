import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string="https://ecommerce.routemisr.com"
  constructor(private _HttpClient:HttpClient) { }
  
  getAllProducts(pageNum:number=1) :Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${pageNum}`)

  }
  getSpecProduct(pId:string) :Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${pId}`)

  }
  getCategory():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(cId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${cId}`)
  }
  getBrands():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
  }
  getSpecificBrand(cId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${cId}`)
  }
}
