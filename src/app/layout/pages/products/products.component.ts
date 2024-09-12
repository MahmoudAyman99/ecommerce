import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink,CurrencyPipe,FilterPipe,FormsModule, NgClass] ,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  loading:boolean=false
  searchTerm:string =""
  productList!:Product[]
  favProductIds :Set <string> = new Set();
  favProductsIds!:string
  constructor(private _ProductsService:ProductsService , private _CartService:CartService, private _ToastrService:ToastrService ,private _WishlistService:WishlistService){}
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

  ngOnInit(){
    
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/products")
    }
    this._ProductsService.getAllProducts().subscribe({
      next:(res) => {
        this.productList = res.data;
      },
      error:(err) => {
        
      }
    })
    this._WishlistService.getLoggedUserWishlist().subscribe(({
      next:(res)=>{
        for (let i = 0; i < res.data.length; i++) {
           this.favProductsIds += `${res.data[i]._id}`;
          
        }
      },
      error:(err)=>{
        
      }
    }))
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
        this._ToastrService.error(err.message);
        
      }
    })
  }
  addToWishlist(pId:string){
    this._WishlistService.addProductToWishlist(pId).subscribe(({
      next:(res)=>{
        this._ToastrService.success(res.message);
        this._WishlistService.wishlistNumber.next(res.data.length)
      },
      error:(err)=>{
      }
    }))
  }


  isProductFav(pId:string):boolean{
    return this.favProductsIds?.includes(pId)
  }
  
}
