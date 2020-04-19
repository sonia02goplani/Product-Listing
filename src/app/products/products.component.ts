import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
productList: Product[] = []
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getProductsList().subscribe(res =>{
if(res){
  this.productList = res;
}
    })
  }

}
