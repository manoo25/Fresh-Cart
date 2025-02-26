import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { log } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../shared/interfaces/products';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';

@Component({
  selector: 'app-details',
  imports: [RouterLink,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

Qty:number=1;


load:boolean=false
  proDetails:Products={} as Products;
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly productsService=inject(ProductsService)
   private readonly cartService=inject(CartService);
   private readonly whishlistService=inject(WhishlistService);
   private readonly toastrService=inject(ToastrService);
cover!:string;
ngOnInit(): void {

  this.cartService.getNum();  
  this.whishlistService.getNum();  
 this.getAll();
 
}

getAll(){
  this.activatedRoute.paramMap.subscribe({
    next:(p)=>{
      this.load=false;
let proId:any=(p.get('proId'));

this.productsService.getSpecificProducts(proId).subscribe({
  next:(res)=>{
   this.proDetails=(res.data);
   console.log(this.proDetails);
   this.cover=this.proDetails.imageCover;
    this.load=true;
  },
  error:(err)=>{
   
  }
  })
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

changeCover(src:string):void{
  this.cover=src;
}


// increase():void{
//   if(this.Qty>=1){
// this.Qty+=1;
//   }

// }
// decrease():void{
//   if(this.Qty>=2){
// this.Qty-=1;
// }
// }
addProTocart(id:string):void{
  this.cartService.addProTocart(id).subscribe({
    next:(res)=>{
      console.log(res.status);
      
     if(res.status=="success")
      this.cartService.getNum();
     this.toastrService.success(res.message);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
addProToheart(id:string):void{
  this.whishlistService.addProToWhishlist(id).subscribe({
    next:(res)=>{     
     if(res.status=="success")
      this.whishlistService.getNum();
     this.toastrService.success(res.message);
    }
  })
}

}
