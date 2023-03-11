import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _url: string = 'http://localhost:3000/'
  productValueUpdated = new EventEmitter();

  constructor(private _http:HttpClient) { }

  addProducts(productBody:any,user:any){
    const userData = {
      products: productBody,
      user : user
    }
    return this._http.post(`${this._url}products`,userData)
  }

  getProducts(productId:string){
    return this._http.get(`${this._url}getAllProducts/${productId}`)
  }

  deleteProduct(productId:string,ProductItemIndex:any){
    return this._http.delete(`${this._url}deleteProducts/${productId}/${ProductItemIndex}`)
  }

  emitSubject(value:any){
    this.productValueUpdated.emit(value)
  }

  updateProduct(productId:string,ProductItemIndex:any,editedData:any){
    return this._http.put(`${this._url}editProducts/${productId}/${ProductItemIndex}`,editedData)
  }
}
