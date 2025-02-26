import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [FormsModule,CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
 private readonly cartService=inject(CartService);
 private readonly router=inject(Router);
 private readonly toastrService=inject(ToastrService);
products:Icart={} as Icart;
num!:number;
isloading:boolean=false;
isloading1:boolean=false;


ngOnInit(): void {
  this.getProductTocart();

}


  increase(id:string,count:number):void{
this.cartService.updateQuantity(count,id).subscribe({
  next:(res)=>{
this.products=res.data;

console.log("yes");

  },
  error:(err)=>{

  }
})
  
  }
  decrease(id:string,count:number):void{
this.cartService.updateQuantity(count,id).subscribe({
  next:(res)=>{
this.products=res.data;
console.log("yes");

  },
  error:(err)=>{

  }
})
  
  }
 

  // add product to cart
 getProductTocart():void{
  this.cartService.GetUserCart().subscribe({
    next:(res)=>{
    this.products=(res.data);
    this.num=res.numOfCartItems;
    this.cartService.getNum();
    if(res.message=='success'){
      this.isloading=false;
    }
    
    
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
deleteProOfCart(id:string):void{
  this.cartService.deleteProOfCart(id).subscribe({
    next:(res)=>{
  this.products=res.data;
  this.num=res.numOfCartItems;
 this.cartService.getNum();
  this.toastrService.success("Product Deleted Successfully");
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
CheckOut(id:string):void{
  this.isloading1=true
setTimeout(() => {
  this.cartService.cartId=id;
this.router.navigate(['/checkout'])
this.isloading1=false;
}, 1500);

}

 ShowAlertToDeleteAllCart(){
  Swal.fire({
    title: "Are you sure?",
    text: "You Want to Delete Cart!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.ClearAllCart();
      Swal.fire({
        title: "Deleted!",
        text: "Your Cart has been deleted.",
        icon: "success"
      });
    }
  });
  }

  ClearAllCart(){
    this.isloading=true;
    this.cartService.ClearCart().subscribe({
      next:(res)=>{
      
       if(res.message=='success'){
        this.getProductTocart();
       }
        
        
      },
      error:(err)=>{
       console.log(err);
       
      }
    })
  }


}
