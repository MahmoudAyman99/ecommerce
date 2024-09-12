import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllSubcategoriesOfCart(catId:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${catId}/subcategories`)
  }
}
