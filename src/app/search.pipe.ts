import { Pipe, PipeTransform } from '@angular/core';
import { product } from './core/interface/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

transform(products:any[], term:string="") :any[]{
  if(term.length==0){
    return products
  }
else{
return products.filter((item)=>item.title.toLowerCase().includes( term.toLocaleLowerCase() ))
 }
}
}
