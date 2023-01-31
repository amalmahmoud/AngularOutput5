import { ProductsService } from './Service/products.service';
import { Product } from './model/products';
import { Component,OnInit , ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HTTP';
  allProducts:Product[]=[];
  editMode:boolean=false;

  isFetching:boolean=false;
  currentProductId:string;

  @ViewChild('productsForm') form:NgForm;
  // injecting instance of HttpClient
  constructor(private productService:ProductsService)
{

}

ngOnInit()
{
  this.fetchProducts();
}
onProductsFetch()
{
  this.fetchProducts();

}
  onProductCreate(products:{pName:string,desc:string,price:string})
  {
    if(!this.editMode)
    {
     this.productService.createProduct(products).subscribe((res)=>{
      console.log(res);
      products = Object.assign(products, { id: res['name'] });
      console.log(products)
      this.allProducts.push(products);
    });
  }
  else{
    this.productService.updateProduct(this.currentProductId,products);
    // const objWithIdIndex = this.allProducts.findIndex((obj) => obj.id === this.currentProductId);
    // this.allProducts[objWithIdIndex] = products;
    this.editMode=false;
  }
  } 


  private fetchProducts()
  {
    this.isFetching=true;
    this.productService.fetchProduct().subscribe((products) =>{
      this.allProducts=products;
      this.isFetching=false;
 
    })
  }

  onDeleteProduct(id:string)
  {

    console.log(id);
    this.productService.deleteProduct(id).subscribe(()=>{
      const objWithIdIndex = this.allProducts.findIndex((obj) => obj.id === id);
       console.log(objWithIdIndex);
    if (objWithIdIndex !== -1) {
    this.allProducts.splice(objWithIdIndex, 1);
    }
  });

  }
  onDeleteAllProducts()
  {
    this.productService.deleteAllProducts();
  }
  onEditClicked(id:string)
  {
    this.currentProductId=id;
    let currentProduct = this.allProducts.find((p) => { return p.id=== id})
    this.form.setValue({
      pName:currentProduct.pName,
      desc:currentProduct.desc,
      price:currentProduct.price

    })

    this.editMode=true;
  }
}
