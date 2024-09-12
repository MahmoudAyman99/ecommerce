import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isCode:boolean=false
  isReset:boolean=false
  loading:boolean=false
  errorMsg!:string
  constructor(private _AuthService:AuthService , private _Router:Router ){

  }

  emailForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email ])
  })
  codeForm:FormGroup = new FormGroup({
    resetCode : new FormControl(null,[Validators.required])
  })
  resetDataForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email ]),
    newPassword : new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6}/ ) ])
  })

  sendEmail(){
    this.loading =true
    this._AuthService.sendEmailApi(this.emailForm.value).subscribe({
      next :(res)=>{
          this.isCode=true
          this.loading =false
          this.errorMsg=""
      },
      error :(err)=>{
          this.errorMsg =err.error.message;
          this.loading =false
      }
    })
  }
  sendCode(){
    this.loading =true
    this._AuthService.sendCodeApi(this.codeForm.value).subscribe({
      next :(res)=>{
          console.log(res);
          this.isCode=false
          this.isReset=true
          this.loading =false
          this.errorMsg=""
      },
      error :(err)=>{
          this.errorMsg =err.error.message;
          this.loading =false
      }
    })
  }
  resetData(){
    this.loading =true
    this._AuthService.resetDataApi(this.resetDataForm.value).subscribe({
      next :(res)=>{
        this.errorMsg=""
        this.loading =false
        this._Router.navigate(['/home'])
        if(typeof localStorage !== "undefined"){
          localStorage.setItem("userToken" , res.token)
          this._AuthService.decodeUserData()
          
      }},
      error :(err)=>{
        this.errorMsg =err.error.message;
          this.loading =false
      }
    }
  

  )}}
