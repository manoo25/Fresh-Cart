import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [FormsModule,SearchPipe,RouterLink,CommonModule,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly whishlistService=inject(WhishlistService);
  private readonly toastrService=inject(ToastrService);
products:Products[]=[];
Stext:string='';

menuItems = [
  { label: 'All' },
  { label: 'Electronics' },
  { label: "Men's" },
  { label: "Women's" },
  { label: "Woman Shawl" }
];

activeItem: string = 'All';

setActive(label: string) {
  this.activeItem = label;
  if(label=='All'){
   this.Stext='';
  }
  else if(label=='Electronics'){
this.Stext='Electronics'
  }
  else if(label=="Men's"){
    this.Stext="Men's Fashion"
    
  
  }
  else if(label=="Women's"){
    this.Stext='Woman'
  
  }
  else if(label=="Woman Shawl"){
    this.Stext='Woman Shawl'
  
  }
 

}

  
ngOnInit(): void {  
  this.getAllproducts();
  this.cartService.getNum();
  this.whishlistService.getNum();

  
}
getAllproducts(){
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
this.products=res.data;

    }
  })
}
addProToWhish(id:string):void{
  this.whishlistService.addProToWhishlist(id).subscribe({
    next:(res)=>{
      console.log(res.status);
      
     if(res.status=="success")
      this.whishlistService.getNum();
     this.toastrService.success(res.message);
    }
  })
}
addProTocart(id:string):void{
  this.cartService.addProTocart(id).subscribe({
    next:(res)=>{
      console.log(res.status);
      
     if(res.status=="success")
      this.cartService.getNum();
     this.toastrService.success(res.message);
    }
  })
}

}
