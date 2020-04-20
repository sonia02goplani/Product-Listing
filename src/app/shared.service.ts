import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "../../src/modals/global";
@Injectable({
  providedIn: "root",
})
export class SharedService {
  isCompanySaved: boolean = false;
  incrementCount: Number = 0;
  constructor(private http: HttpClient) {}

  addCompany(reqObj: Company): Observable<Company> {
    return this.http.post<Company>(
      "http://localhost:5000/company/addCompany",
      reqObj
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>("http://localhost:5000/company");
  }
  addProduct(reqObj: Product){
    return this.http.post<any>(
      "http://localhost:5000/company/addProduct",
      reqObj
    );
  }
  getProductsList(): Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:5000/product")
  }
  getCompanyProducts(reqObj): Observable<Product[]>{
    return this.http.post<Product[]>("http://localhost:5000/company/products" , reqObj)

  }
  getOrdersByYear(reqObj): Observable<Order[]>{
    return this.http.post<Order[]>("http://localhost:5000/product/orders", reqObj)
  }
  placeOrder(reqObj): Observable<Order>{
    return this.http.post<Order>("http://localhost:5000/product/placeorder", reqObj)
  }
}
