import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  myCart!:Cart
  constructor(private _CartService:CartService ,private _ToastrService:ToastrService ){}
  ngOnInit(){

    this._CartService.getCart().subscribe({
      next:(res) =>{
        console.log(res);
        this.myCart = res

      }, 
      error:(err) =>{
        console.log(err);
        
      }
    })

    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/cart")
    }
  }
  updateQuantity(pId:string , pCount:number){
    this._CartService.updateProductQuantity(pId , pCount.toString()).subscribe({
      next:(res )=>{
        console.log(res);
        this._ToastrService.success("Cart updated successfuly");
        this.myCart=res
      },
      error:(err )=>{
        console.log(err);
        this._ToastrService.error(err.message); 
      },
    })
  }
  removeSpecItem(pId:string){
    this._CartService.removeSpecItem(pId).subscribe({
      next:(res) =>{
        console.log(res);
        this._ToastrService.success("Product removed successfully");
        this.myCart = res
        this._CartService.cartNumber.next(res.numOfCartItems)
      }, 
      error:(err) =>{
        console.log(err);
        
      }
    })
  }

  removeAllproducts(){
    this._CartService.clearCart().subscribe(({
      next:(res) =>{
        console.log(res);
        this._ToastrService.success("All Products are removed successfully from Cart");
        this.myCart.data.products.length = 0
        this._CartService.cartNumber.next(0)
      }, 
      error:(err) =>{
        console.log(err);
        
      }
    }))
  }

}
