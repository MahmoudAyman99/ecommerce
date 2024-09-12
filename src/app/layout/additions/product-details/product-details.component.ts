import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent{
  loading:boolean=false
  myProduct!:Product
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
constructor(private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService ,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      this._ProductsService.getSpecProduct(res.params.id).subscribe({
        next:(res) =>{
          this.myProduct = res.data
        },
         error :(err) =>{
          
         }
      })
    })
    
  }
  addProduct(pId:string){
    this.loading=true
    this._CartService.addProductToCart(pId).subscribe({
      next:(res) =>{
        this.loading=false
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems)
        
      },
      error:(err) =>{
        this.loading=false
        
      }
    })
  }
}
