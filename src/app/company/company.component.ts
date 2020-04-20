import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
  companyList : Company[] = [];
  constructor( private formBuilder: FormBuilder,private sharedService: SharedService, private router: Router ) { }

ngOnInit() {
 this.sharedService.getCompanies().subscribe(res =>{
   console.log(res)
   this.companyList = res;
 })
}
}
