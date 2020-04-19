import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompanyComponent,
    CreateProductComponent,
    ProductsComponent,
    NavbarComponent,
    CreateCompanyComponent,
    PlaceOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
