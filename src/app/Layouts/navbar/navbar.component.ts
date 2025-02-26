
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslationService } from '../../core/services/translation/mytranslation.service';

@Component({
  selector: 'app-navbar',

  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

 readonly  authService=inject(AuthService)
  public cartService=inject(CartService);
  public whishlistService=inject(WhishlistService);
  public mytranslationService=inject(MytranslationService);
num:number=0;
Wnum:number=0;
  isLogin=input<boolean>();

  isOpen: boolean = false;

  isOpenD = false;

  toggleDropdown() {
    this.isOpenD = !this.isOpenD;
  }

ngOnInit(): void { 
this.getNumC();
this.getNumW();
}


getNumC(){
    this.cartService.cartCount$.subscribe(count => {
    this.num = count; 
  });
}
getNumW(){
    this.whishlistService.whishCount$.subscribe(count => {
    this.Wnum = count; 
  });
}


  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  removeToken():void{
  this.authService.logOut();
   
  }

   ShowAlertToLogout(){
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Log Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeToken();
       
      }
    });
    }

    change(lang:string):void{
this.mytranslationService.changeLang(lang)
    }





}
