import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
cartId!:string;

  private cartCount = new BehaviorSubject<number>(0); 
  cartCount$ = this.cartCount.asObservable();
public refresh!:boolean;
  constructor(private readonly httpClient:HttpClient) { }

  ngOnInit(): void {
this.getNum();
  }

  addProTocart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
         "productId": id
      }
    )
  }

  GetUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`
     
    )
  }

  getNum(): void {
    this.GetUserCart().subscribe({
      next: (res) => {
        this.cartCount.next(res.numOfCartItems); 
      
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  deleteProOfCart(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    )
  }

  updateQuantity(count:number,id:string):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
 "count": count
    }
  )
  }


 

   ClearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
 
  )
  }

}
 

