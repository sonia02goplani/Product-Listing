import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SharedService } from "../shared.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import jsPDF from "jsPDF";

@Component({
  selector: "app-place-order",
  templateUrl: "./place-order.component.html",
  styleUrls: ["./place-order.component.css"],
})
export class PlaceOrderComponent implements OnInit {
  placeOrderForm: FormGroup;
  companyNameList: Company[] = [];
  productNameList: Product[] = [];
  currentproduct: Product[] = [];
  isOrderPlaced: boolean = false;
  alertMsg: String;
  alertErrorMsg: String;
  hasError: boolean = false;
  showModal: boolean = false;
  currentOrder: Order;
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getOrderByYear();
    this.getCompanies();
    this.placeOrderForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      productName: ["", Validators.required],
      rate: ["", Validators.required],
      quantity: ["", Validators.required],
      totalPrice: ["", Validators.required],
    });
  }
  getCompanies() {
    this.sharedService.getCompanies().subscribe((res) => {
      console.log(res);
      this.companyNameList = res;
    });
  }
  getCompanyProducts(e) {
    let reqObj = { companyName: e.target.value };
    this.sharedService.getCompanyProducts(reqObj).subscribe((res) => {
      this.productNameList = res;
      this.placeOrderForm.get("rate").patchValue("");
    });
  }

  getProductRate(e) {
    this.currentproduct = this.productNameList.filter(
      (product) => product.productName === e.target.value
    );
    console.log(this.currentproduct);
    if (this.currentproduct) {
      this.placeOrderForm.get("rate").patchValue(this.currentproduct[0].cost);
    }
  }
  calculateTotalPrice() {
    let totalPrice =
      this.placeOrderForm.get("rate").value *
      this.placeOrderForm.get("quantity").value;
    this.placeOrderForm.get("totalPrice").patchValue(totalPrice);
  }
  closeModal() {
    this.showModal = false;
  }
  getOrderByYear(){
    this.sharedService
    .getOrdersByYear({ orderYear: new Date().getFullYear() })
    .subscribe((res) => {
      console.log(res.length)
      if (res.length > 0) {
        this.sharedService.incrementCount = res.length + 1;
      } else {
        this.sharedService.incrementCount = 1;
      }
    });
  }
  placeOrder() {
    this.getOrderByYear();
    let reqObj = {
      companyName: this.placeOrderForm.get("companyName").value,
      productName: this.placeOrderForm.get("productName").value,
      orderNo:
        "PO/" +
        new Date().getFullYear() +
        "/" +
        this.sharedService.incrementCount,
      orderYear: new Date().getFullYear(),
      rate: this.placeOrderForm.get("rate").value,
      quantity: this.placeOrderForm.get("quantity").value,
      totalPrice: this.placeOrderForm.get("totalPrice").value,
    };
    this.sharedService.placeOrder(reqObj).subscribe(
      (res) => {
        if (res) {
          this.isOrderPlaced = true;
          this.currentOrder = res;
          this.alertMsg = `your Order placed Successfully and your order Number is  ${res.orderNo}`;
          this.placeOrderForm.reset();
          this.showModal = true;

          setTimeout(() => {
            this.isOrderPlaced = false;
          }, 5000);
        }
      },
      (error) => {
        if (error) {
          this.hasError = true;
          this.alertErrorMsg = "Something went Wrong  !!!";
          setTimeout(() => {
            this.hasError = false;
          }, 5000);
        }
      }
    );

    console.log(reqObj.orderNo);
  }
  @ViewChild("pdfContent", { static: false }) pdfContent: ElementRef;

  downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      "#editor": function (element, renderer) {
        return true;
      },
    };

    const pdfContent = this.pdfContent.nativeElement;

    doc.fromHTML(pdfContent.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers,
    });

    doc.save("orderSummary.pdf");
  }
}
