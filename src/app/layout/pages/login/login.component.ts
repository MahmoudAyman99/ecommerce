import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading:boolean=false
  errorMsg!:string
  show:boolean = false
  constructor(private _AuthService:AuthService , private _Router:Router){

  }

  loginForm :FormGroup = new FormGroup ({
    email : new FormControl(null , [Validators.required , Validators.email ]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6}/ ) ])

  } )

  sendData():void{
    // call Api
    this.loading =true
    this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        
        this._Router.navigate(['/home'])
        this.loading =false
        if(typeof localStorage !== "undefined"){
          localStorage.setItem("userToken" , res.token)
          this._AuthService.decodeUserData()
        }
        
      },
      error:(err)=>{
        this.loading =false
        this.errorMsg =err.error.message;
      }
    })
  }
  
}
