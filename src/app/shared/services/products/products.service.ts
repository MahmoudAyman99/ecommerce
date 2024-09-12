import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products`)
  }
  getSpecProduct(productId : string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products/${productId}`)
  }
}
