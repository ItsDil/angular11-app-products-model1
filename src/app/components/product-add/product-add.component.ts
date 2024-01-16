import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{

  public formAddProduct!: FormGroup;
  public submitted:boolean=false;


  constructor(private productService:ProductsService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.formAddProduct = this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    })
  }


  onSaveProduct() {
    //  let addedproduct ={
    //   name:this.formAddProduct.get("name")?.value,
    //   price:this.formAddProduct.get("price")?.value,
    //   quantity:this.formAddProduct.get("quantity")?.value,
    //   selected:this.formAddProduct.get("selected")?.value,
    //   available:this.formAddProduct.get("available")?.value
    // }

    this.submitted = true;
    if(this.formAddProduct.invalid) return;
    this.productService.addProduct(this.formAddProduct.value).subscribe(
      (data)=>{
        alert("Success Saving product");
      }
    )
  }
}
