import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { IOrders } from '../../shared/interfaces/i-orders';
import { CartService } from '../../core/services/cart/cart.service';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,DatePipe,TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  Orders:IOrders[]=[];
  num!:number;
  orderNum!:number;
  showOrders:boolean=true;
  showDetails:boolean=false;

  private readonly checkoutService=inject(CheckoutService)
  private readonly cartService=inject(CartService)
  private readonly whishlistService=inject(WhishlistService)
ngOnInit(): void {
this.cartService.getNum();
this.whishlistService.getNum();
  this.getAllOrders();
}
getAllOrders():void{
this.checkoutService.getAllOrders(localStorage.getItem('userid')!).subscribe({
  next:(res)=>{
this.Orders=res;
this.num=(this.Orders.length);



  }
})
}

getNumOrder(num:number):void{
 this.orderNum=num;
 this.showDetails=true;
 this.showOrders=false;
  
}
BackToOrders():void{
 this.showDetails=false;
 this.showOrders=true;
  
}

}
