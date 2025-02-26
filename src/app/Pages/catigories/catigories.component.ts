import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatigoriesService } from '../../core/services/catigories/catigories.service';
import { Catigories } from '../../shared/interfaces/catigories';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { WhishlistService } from '../../core/services/whishlist/whishlist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-catigories',
  imports: [FormsModule,CommonModule,TranslatePipe],
  templateUrl: './catigories.component.html',
  styleUrl: './catigories.component.scss'
})
export class CatigoriesComponent {
private readonly catigoriesService=inject(CatigoriesService);
private readonly cartService=inject(CartService);
private readonly whishlistService=inject(WhishlistService);

catigories:Catigories[]=[]
Stext:string='';

ngOnInit(): void {
  this.cartService.getNum();
  this.whishlistService.getNum();
  this.getAllCategories();
  
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

}
