import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(ProductArr:any[],text:string): any[] {
    return ProductArr.filter((item)=>item.title.toLowerCase().includes(text.toLowerCase())||item.category.name.toLowerCase()==(text.toLowerCase()));
  }

}
