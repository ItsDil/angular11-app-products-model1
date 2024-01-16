import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../models/product.model";



@Injectable({providedIn:'root'}) //Indique qu'une seule instance du service sera créée et partagée par toute l'app, à l'aide de l'injecteur root, Juste on injecte on fait rien
// @Injectable() // Pour l'injecter dans d'autres services/components, il faudra le déclarer dans les décorateurs @Component OU @NgModule.
export class ProductsService{
  constructor(private http:HttpClient) {}
  host = 'http://localhost:3000';
  unreachableHost = 'http://localhost:8000';

  public getAllProducts():Observable<Product[]>{
   let testHost = (Math.random()>0.2)? this.host:this.unreachableHost
    return  this.http.get<Product[]>(testHost+"/products")
  }

  public getSelectedProducts():Observable<Product[]>{
    // let host:string=environment.host;
    return  this.http.get<Product[]>(this.host+"/products?selected=true")
  }
  public getAvailableProducts():Observable<Product[]>{
    // let host:string=environment.host;
    return  this.http.get<Product[]>(this.host+"/products?available=false")
  }

  public searchProduct(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
  }

  public select(product:Product):Observable<Product>{
    product.selected = !product.selected;
    return this.http.put<Product>(this.host+"/products/"+product.id,product); //ce product est payload!!!!!!!!!!!!!!!!!!!!!!
  }

  public deleteProduct(product:Product):Observable<void>{
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }

  public addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.host+"/products",product);
  }

  public getProduct(id:number):Observable<Product>{
    return  this.http.get<Product>(this.host+"/products/"+id);
  }

  public editProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(this.host+"/products/"+product.id,product);
  }

}
