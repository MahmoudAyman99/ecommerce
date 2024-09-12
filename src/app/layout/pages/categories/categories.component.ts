import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { SubCategoryService } from '../../../shared/services/subCategories/sub-category.service';
import { SubCategory } from '../../../shared/interfaces/sub-category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoryName:string=""
  categoriesList!:Category[]
  subCategoriesList!:SubCategory[]
  constructor(private _CategoriesService:CategoriesService , private _SubCategoryService:SubCategoryService){}
  ngOnInit(){
    
    this._CategoriesService.getAllCategories().subscribe({
      next :(res)=>{
        this.categoriesList =res.data;
      },
      error :(err)=>{
        
      }
    })
    if(typeof localStorage !== "undefined"){
      localStorage.setItem("currentPage" , "/categories")
    }
  }
  getSubCategory(catName:string,catId:string){
    this.categoryName =catName;
    this._SubCategoryService.getAllSubcategoriesOfCart(catId).subscribe(({
      next:(res)=>{
        this.subCategoriesList = res.data        
      },
      error:(err)=>{
      }
    }))
  }
}
