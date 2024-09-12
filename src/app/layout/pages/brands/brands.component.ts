import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brand } from '../../../shared/interfaces/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brandsList!:Brand[]
  constructor(private _BrandsService:BrandsService){}
  ngOnInit(){

    this._BrandsService.getAllBrands().subscribe({
      next :(res)=>{
        this.brandsList =res.data;
      },
      error :(err)=>{
        
      }
    })
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/brands")
    }
  }
}
