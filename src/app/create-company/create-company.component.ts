import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "../shared.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-create-company",
  templateUrl: "./create-company.component.html",
  styleUrls: ["./create-company.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CreateCompanyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  alertErrorMsg: string;
  hasError: boolean = false;
  alertMsg: string;
  addCompanyForm: FormGroup;
  ngOnInit() {
    this.sharedService.isCompanySaved = false;
    this.addCompanyForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      gst: ["", Validators.required],
    });
  }
  Submit() {
    let reqObj = {
      companyName: this.addCompanyForm.get("companyName").value,
      gst: this.addCompanyForm.get("gst").value,
    };
    this.sharedService.addCompany(reqObj).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.sharedService.isCompanySaved = true;
          this.alertMsg = `${res.companyName} saved Successfully`;
          this.addCompanyForm.reset();
          setTimeout(() => {
            this.sharedService.isCompanySaved = false;
          }, 5000);
        } else {
          this.sharedService.isCompanySaved = true;
          this.alertMsg = "Something Went Wrong !!!";
        }
      },
      (error) => {
        if (error) {
          this.hasError = true;
          this.alertErrorMsg = "Company Already Exists  !!!";
          setTimeout(() => {
            this.hasError = false;
          }, 5000);
        }
      }
    );
  }
}
