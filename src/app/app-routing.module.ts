import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {CompanyComponent} from './company/company.component'
import {CreateProductComponent} from './create-product/create-product.component'
import {ProductsComponent} from './products/products.component';
import { PlaceOrderComponent} from './place-order/place-order.component'

import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'companyList', component: CompanyComponent },
  { path: 'addProduct', component: CreateProductComponent },
  { path: 'productList', component: ProductsComponent },
  { path: 'placeOrder', component: PlaceOrderComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
