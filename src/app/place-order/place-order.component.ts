import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  placeOrderForm: FormGroup;
  companyNameList: Company[]=[];
  productNameList: Product[]=[];
  currentproduct: Product[]=[];
  isOrderPlaced: boolean = false;
  alertMsg: String;
  alertErrorMsg: String;
  hasError: boolean = false;
  constructor(private sharedService: SharedService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sharedService.getOrders().subscribe(res =>{
      if(res){
        this.sharedService.incrementCount = res.length + 1;
      }
    });
    this.getCompanies();
    this.placeOrderForm  =  this.formBuilder.group({
      companyName: ['', Validators.required],
      productName: ['', Validators.required],
      rate: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],

    });
  }
getCompanies(){
  this.sharedService.getCompanies().subscribe(res =>{
    console.log(res)
    this.companyNameList = res;
  })

}
getCompanyProducts(e){
  let reqObj= {companyName : e.target.value}
this.sharedService.getCompanyProducts(reqObj).subscribe(res=>{
this.productNameList =res;
this.placeOrderForm.get('rate').patchValue("");

})
}

getProductRate(e){
  this.currentproduct= this.productNameList.filter(product => product.productName === e.target.value)
  console.log(this.currentproduct)
  if(this.currentproduct){
    this.placeOrderForm.get('rate').patchValue(this.currentproduct[0].cost);
  }
}
calculateTotalPrice(){
  let totalPrice=this.placeOrderForm.get('rate').value * this.placeOrderForm.get('quantity').value
  this.placeOrderForm.get('totalPrice').patchValue(totalPrice);
}
  placeOrder(){
    let reqObj={
      companyName: this.placeOrderForm.get('companyName').value,
      productName: this.placeOrderForm.get('productName').value,
      orderNo: 'PO/' + (new Date()).getFullYear() + '/' + this.sharedService.incrementCount ,
      rate: this.placeOrderForm.get('rate').value,
      quantity: this.placeOrderForm.get('quantity').value,
      totalPrice: this.placeOrderForm.get('totalPrice').value
    }
    this.sharedService.placeOrder(reqObj).subscribe(res=>{
if(res){
  this.isOrderPlaced = true;
        this.alertMsg= `your Order placed Successfully and your order Number is  ${res.orderNo}`
        this.placeOrderForm.reset();
        setTimeout( ()=>{
          this.isOrderPlaced=false;
        }, 5000)
}
    },
    error=>{
      if(error){ 
        this.hasError = true;
        this.alertErrorMsg="Something went Wrong  !!!"
        setTimeout( ()=>{
          this.hasError=false;
        }, 5000)
      }
    })

    
    console.log(reqObj.orderNo)
  }

}
