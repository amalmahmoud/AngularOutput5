import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../model/products';

@Injectable({
    providedIn:'root'
})
export class ProductsService {
    constructor(private http:HttpClient)
    {
    
    }

    createProduct(products:{pName:string,desc:string,price:string})
    {
        const headers= new HttpHeaders({'myHeader': 'procademy'})
        console.log(products)
        return this.http.post('https://angular-project1-7b3d5-default-rtdb.firebaseio.com/products.json',products,{headers:headers})
 
    }

    fetchProduct()
    {
        return this.http.get<{[key:string]:Product}>('https://angular-project1-7b3d5-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res)=>
        {
           const products=[];
           for(const key in res)
            {
              if(res.hasOwnProperty(key))
               {
                products.push({...res[key],id:key})
               } 
            }
            return products;
        }))
    }
    deleteProduct(id:string)
    {
        return this.http.delete('https://angular-project1-7b3d5-default-rtdb.firebaseio.com/products/'+id+ '.json');

    }
    deleteAllProducts()
    {
        this.http.delete('https://angular-project1-7b3d5-default-rtdb.firebaseio.com/products.json').subscribe();

    }
    updateProduct(id:string,value:Product)
    {
        return this.http.put('https://angular-project1-7b3d5-default-rtdb.firebaseio.com/products/'+id+ '.json',value).subscribe();

    }
}