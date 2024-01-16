import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private productService:ProductsService, private router: Router) {}

  products$: Observable<AppDataState<Product[]>>|null=null;
  // products:Product[]|null=null;

  readonly DataStateEnum = DataStateEnum;

  ngOnInit(): void {

  }

  onGetAllProducts() {

    this.products$ = this.productService.getAllProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMsg:err.message})) // attention hhhhh pas err.message()
    )

    // this.productService.getAllProducts().subscribe(
    //   (data)=>{
    //     this.products = data;
    //   },error => {
    //     console.log(error)
    //   }
    // )
  }


  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map( (data)=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data: data})
      } ),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errMsg: err.message} ))
    )
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(

      map( (data)=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data:data})
        }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError( err => of({ dataState:DataStateEnum.ERROR, errorMsg:err.message }) )


    )
  }
  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProduct(dataForm.keyword).pipe(
      map( (data)=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError( err => of({ dataState:DataStateEnum.ERROR, errorMsg:err.message }) )

    )
  }

  onSelect(p: Product) {
    this.productService.select(p).subscribe(
      (data)=>{
        // this.onGetAllProducts();
        p.selected=data.selected;

        // this.products$?.subscribe(
        //   data=>{
        //     console.log('products state:', data.data);
        //   }
        // )
      }
    )
  }

  onDeleteProduct(p: Product) {
    let confDelete = confirm("Are you sur for deleting that product ?");
    if(confDelete) {
      this.productService.deleteProduct(p).subscribe(
        (data) => {
          this.onGetAllProducts();
        }
      )
    }
  }

  onNewProduct() {
    // this.router.navigateByUrl("/new-product");
    this.router.navigate(['newProduct'])
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
