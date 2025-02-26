import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

   private whishCount = new BehaviorSubject<number>(0); 
   whishCount$ = this.whishCount.asObservable();
 public refresh!:boolean;
   constructor(private readonly httpClient:HttpClient) { }
 
   ngOnInit(): void {
 this.getNum();
   }
 
   addProToWhishlist(id:string):Observable<any>{
     return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
       {
          "productId": id
       }
     )
   }
 
   GetUserWhishlist():Observable<any>{
     return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`
      
     )
   }
 
   getNum(): void {
     this.GetUserWhishlist().subscribe({
       next: (res) => {
         this.whishCount.next(res.count); 
       
       }
     });
   }
 
 
   deleteProOfwhish(id:string):Observable<any>{
     return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
     )
   }
 
 
}
