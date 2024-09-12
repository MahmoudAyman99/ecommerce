
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  WishlistNumber!:number
  cartNumber!:number
  isLogin:boolean=false;
  constructor(private flowbiteService: FlowbiteService , private _AuthService:AuthService ,private _Router:Router , private _CartService:CartService , private _WishlistService:WishlistService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  

    this._AuthService.UserData.subscribe(()=>{
      if(this._AuthService.UserData.getValue() !== null){
        this.isLogin=true;
        
    this._CartService.getCart().subscribe(({
      next:(res)=>{
        this.cartNumber =res.numOfCartItems
        
      },
      error:(err)=>{
        
      }
    }))

    this._CartService.cartNumber.subscribe((res)=>{
      this.cartNumber =res
    })
    this._WishlistService.wishlistNumber.subscribe((res)=>{
      this.WishlistNumber =res
    })
    this._WishlistService.getLoggedUserWishlist().subscribe(({
      next:(res)=>{
        this._WishlistService.wishlistNumber.next(res.count)
        
      }
    }))

      }
      else{
        this.isLogin=false;
      }
    })

  }
  signOut(){
    // remove user token 
    if(typeof localStorage !== "undefined"){
      localStorage.removeItem("userToken");
    }
    

    // set userData (null)
    this._AuthService.UserData.next(null);

    // login
    this._Router.navigate(["/login"]);
  }
}
