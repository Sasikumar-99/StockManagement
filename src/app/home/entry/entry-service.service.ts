import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {

  constructor(private _http:HttpClient) { }
  _url: string = environment.baseUrl
  save(entryData:any[],entryId:string){
    return this._http.post(`${this._url}entryList/${entryId}`,entryData)
  }
  getEntryList(entryId:string){
    return this._http.get(`${this._url}getEntryList/${entryId}`)
  }
}
