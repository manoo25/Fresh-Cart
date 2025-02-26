import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
   governorates: string[] = [
    "Cairo", "Giza", "Alexandria", "Qalyubia", "Port Said", "Suez", "Dakahlia",
    "Aswan", "Asyut", "Beheira", "Beni Suef", "Damietta", "Fayoum", "Gharbia",
    "Ismailia", "Kafr El Sheikh", "Matrouh", "Minya", "Menofia", "New Valley",
    "North Sinai", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Qena",
    "Luxor"
  ];
private readonly cartService=inject(CartService)
private readonly checkoutService=inject(CheckoutService)
private readonly router=inject(Router)
idCart!:string;
ngOnInit(): void {
  this.getIdCart();
  
}
getIdCart():void{
 this.idCart=(this.cartService.cartId);
 console.log(this.idCart);
 
}

isloading:boolean=false;
isloading1:boolean=false;

  checkout:FormGroup=new FormGroup({
    details:new FormControl(null),
phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
city:new FormControl(null,Validators.pattern(/^(?!Choose a City$).+/)),



  });
  PayCash():void{
    this.isloading=true;   
this.checkoutService.payCash(this.idCart,this.checkout.value).subscribe({
  next:(res)=>{
    if(res.status=="success"){
      this.cartService.getNum();
this.router.navigate(['/allorders'])
this.isloading=false
    }
    
    
  },
  error:(err)=>{
    this.isloading=false
    
  }
})
  
  
  
  
  }
  submitForm():void{
    this.isloading1=true;
this.checkoutService.payOnline(this.idCart,this.checkout.value).subscribe({
  next:(res)=>{
    
    if(res.status=="success"){
      open(res.session.url)
      this.isloading1=false;
    }
    
  },
  error:(err)=>{
    this.isloading1=false

    
  }
})
  
  
  
  
  }



}
