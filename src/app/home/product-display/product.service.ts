import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _url: string = environment.baseUrl
  productValueUpdated = new EventEmitter();
  private _loading:any
   _editValueEmitter = new EventEmitter();
  constructor(private _http:HttpClient,private loading:LoadingController) { }

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

  emitEditingData(value:any){
    return new Promise((resolve,reject)=>{
      resolve(this._editValueEmitter.emit(value))
    })
  }
}
