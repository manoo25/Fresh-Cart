import { Component, inject } from '@angular/core';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { Iwhishlist } from '../../shared/interfaces/iwhishlist';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-whish-list',
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './whish-list.component.html',
  styleUrl: './whish-list.component.scss'
})
export class WhishListComponent {
private readonly whishlistService=inject(WhishlistService);
private readonly cartService=inject(CartService);
 private readonly toastrService=inject(ToastrService);
products:Iwhishlist={} as Iwhishlist;
num!:number;



ngOnInit(): void {  
  this.getProductTowhish();
  this.cartService.getNum();
  this.whishlistService.getNum();



}


 

  // add product to cart
 getProductTowhish():void{
  this.whishlistService.GetUserWhishlist().subscribe({
    next:(res)=>{
    this.products=(res);
    this.num=res.count;
    }
  })
}
deleteProOfCart(id:string):void{
  this.whishlistService.deleteProOfwhish(id).subscribe({
    next:(res)=>{ 
      this.getProductTowhish();
      this.whishlistService.getNum();
 if(res.status=='success'){ 
    this.toastrService.success("Product Deleted Successfully");
 }

    }
  })
}



  
}
