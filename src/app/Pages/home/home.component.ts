import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Brand, Category, Products } from '../../shared/interfaces/products';
import { CatigoriesService } from '../../core/services/catigories/catigories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Catigories } from '../../shared/interfaces/catigories';

import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from "../slider/slider.component";
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../shared/interfaces/brands';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, SliderComponent,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
private readonly catigoriesService=inject(CatigoriesService);
private readonly cartService=inject(CartService);
private readonly whishlistService=inject(WhishlistService);
private readonly bandsService=inject(BrandsService);
private readonly authService=inject(AuthService);
private readonly toastrService=inject(ToastrService);

products:Products[]=[]
catigories:Catigories[]=[]
brands:Brands[]=[]
Stext:string='';




ngOnInit(): void {
    this.cartService.getNum();  
    this.whishlistService.getNum();  
    this.getUserId();
  this.getAllCategories(); 
      this.getAllproducts();
      this.getAllBrands();

}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayMouseleaveTimeout:2000,
rtl:true,
  autoplayHoverPause:true,
  navText: ['<i class="fa-solid fa-arrow-left bg-[#CA1515] p-2 rounded-lg"></i>', '<i class="fa-solid fa-arrow-right bg-[#CA1515] p-2 rounded-lg"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false
}
customOptions2: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayMouseleaveTimeout:2000,
  rtl:true,
  autoplayHoverPause:true,
  navText: ['<i class="fa-solid fa-arrow-left bg-[#CA1515] p-2 rounded-lg"></i>', '<i class="fa-solid fa-arrow-right bg-[#CA1515] p-2 rounded-lg"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}

getAllproducts(){

  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
this.products=res.data;




    }
  })
}
getAllCategories(){
  this.catigoriesService. getAllCategories().subscribe({
    next:(cat)=>{

this.catigories=cat.data;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

  // add product to cart
  addProToheart(id:string):void{
    this.whishlistService.addProToWhishlist(id).subscribe({
      next:(res)=>{     
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
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getProductTocart():void{
    this.cartService.GetUserCart().subscribe({
      next:(res)=>{
 
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
getAllBrands():void{
this.bandsService.getBrands().subscribe({
  next:(res)=>{
this.brands=res.data;
  }
})
}
getUserId():void{
  this.authService.getVerifyToken().subscribe({
    next:(res)=>{
if(res.message=='verified'){
localStorage.setItem('userid',res.decoded.id)
}
    }
  })
}
}
