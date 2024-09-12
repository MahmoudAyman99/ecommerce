import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { 
    
    
  }

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {productId}
    )
  }

  updateProductQuantity(productId:string , count:string):Observable<any>{
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": count
      }
    )
  }
  getCart():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/cart`
    )
  }
  removeSpecItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart/${productId}`)
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart`)
  }
}
