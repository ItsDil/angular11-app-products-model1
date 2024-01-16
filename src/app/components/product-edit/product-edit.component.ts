import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  public productId:number;
  public formEditProduct!:FormGroup;
  public submitted : boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private productService:ProductsService, private fb:FormBuilder){
    this.productId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.productService.getProduct(this.productId).subscribe(
      (product)=>{
        this.formEditProduct = this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required],
        })
       }
    )
  }

  onEditProduct() {
    this.submitted = true;
    if(this.formEditProduct.invalid) return;
    this.productService.editProduct(this.formEditProduct?.value).subscribe(
      (data)=>{
        // this.productService.getAllProducts().subscribe(
        //   (data)=>{
        //
        //   }
        // )
       alert("Success Product Updated")
      }
    )
  }
}
