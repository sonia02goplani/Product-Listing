import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent implements OnInit {
  companyNameList: String[] = [];
  addProductForm: FormGroup;
  loading = false;
  isProductSaved: boolean = false;
  hasError: boolean = false;
  alertMsg: String;
  alertErrorMsg: String;
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCompanies();
    this.addProductForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      productName: ["", Validators.required],
      cost: ["", Validators.required],
    });
  }

  getCompanies() {
    this.loading = true;
    this.sharedService.getCompanies().subscribe((res) => {
      console.log(res);
      for (let company of res) {
        this.companyNameList.push(company.companyName);
      }
    });
    if (this.companyNameList) {
      this.loading = false;
    }
  }

  addProduct() {
    let reqObj = {
      companyName: this.addProductForm.get("companyName").value,
      productName: this.addProductForm.get("productName").value.toUpperCase(),
      cost: this.addProductForm.get("cost").value,
    };
    this.sharedService.addProduct(reqObj).subscribe(
      (res) => {
        console.log(res);

        if (res) {
          console.log(res.error);
          this.isProductSaved = true;
          this.alertMsg = `${res.productName} added Successfully`;
          this.addProductForm.reset();
          setTimeout(() => {
            this.isProductSaved = false;
          }, 5000);
        }
      },
      (error) => {
        if (error) {
          this.hasError = true;
          this.alertErrorMsg = "Product Already Exists  !!!";
          setTimeout(() => {
            this.hasError = false;
          }, 5000);
        }
      }
    );
  }
}
