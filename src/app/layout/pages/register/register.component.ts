import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  loading:boolean=false
  errorMsg!:string
  constructor(private _AuthService:AuthService , private _Router:Router){

  }

  registerForm :FormGroup = new FormGroup ({
    name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) ]),
    email : new FormControl(null , [Validators.required , Validators.email ]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6}/ ) ]),
    rePassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6}/ ) ]),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/ ) ])

  } , this.checkPassword)

  sendData():void{
    // call Api
    this.loading =true
    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/login'])
        this.loading =false
      },
      error:(err)=>{
        console.log(err.error.message);
        this.loading =false
        this.errorMsg =err.error.message;
      }
    })
  }
  checkPassword(form :any){
    if(form.get("password").value == form.get("rePassword").value){
      return null
    }
    else {
      return {"passwordMatch" : true}
    }
  }
  
}
