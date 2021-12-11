import { Bands } from './../bands';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8080/api/band'
  constructor(private http: HttpClient) { }

  getBand() {
    return this.http.get(this.baseUrl)
  }

  getBandById(id: string) {
    return this.http.get(this.baseUrl + '/' + id)
  }

  addBand(newband: any) {
    return this.http.post(this.baseUrl, newband)
  }

  deleteBand(id: string) {
    return this.http.delete(this.baseUrl + '/' + id)
  }

  updateBand(band: any, id: string) {
    return this.http.put(this.baseUrl + '/' + id, band)
  }

  updateBandName(newname: string, id: string) {
    return this.http.patch(this.baseUrl + '/' + id, newname)
  }
}
