import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private readonly httpClient:HttpClient) { }

  payCash(id:string,data:any):Observable<any>{
return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
  {
    "shippingAddress":data
  }
)
  }
  payOnline(id:string,data:any):Observable<any>{
return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
  {
    "shippingAddress":data
  }
)
  }

  getAllOrders(UserId:string):Observable<any>{
return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`)
  }
}
