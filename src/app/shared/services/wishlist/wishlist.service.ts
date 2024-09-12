import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) { 
    
  }
 
  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`
    )
    
  }
  deleteProductFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
  addProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/wishlist`,
      {productId})
  }

}

