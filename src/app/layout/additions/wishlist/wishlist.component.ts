import { WishlistService } from './../../../shared/services/wishlist/wishlist.service';
import { Component } from '@angular/core';
import { Wishlist } from '../../../shared/interfaces/wishlist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistProducts!:Wishlist
  constructor(private _WishlistService:WishlistService , private _ToastrService:ToastrService){}
  ngOnInit(){
    this._WishlistService.getLoggedUserWishlist().subscribe(({
      next:(res)=>{
        console.log(res);
        this.wishlistProducts = res
      },
      error:(err)=>{
        console.log(err);
        
      }
    }))
  }
  removeProductFromWishlistr(pId:string){
    this._WishlistService.deleteProductFromWishlist(pId).subscribe(({
      next:(res)=>{
        console.log(res);
        this._WishlistService.wishlistNumber.next(res.data.length)
        this._ToastrService.success("The product is deleted successfully from wishList");
        this._WishlistService.getLoggedUserWishlist().subscribe((res)=>{
          this.wishlistProducts = res
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    }))
  }

  }


