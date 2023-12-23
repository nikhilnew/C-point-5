import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, AbstractControl, } from '@angular/forms';
// import { getDate } from 'date-fns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
// import { ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/features/services/service.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  projectForm: any = FormGroup;
  submitted = false;

  getPname: any;
  reqBody: any;

  addressForm: any = FormGroup;
  repositoryForm: any = FormGroup;

  stateInfo: any;
  countryInfo: any;
  Vcountry: any;


  cityInfo: any;
  Vstate: any;
  Vcity: any;
  timesheetDltByid: any;
  country_id: any
  state_id: any
  cities: any;
  states: any;
  countries: any;



  constructor(private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService, private ServiceService: ServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.allCountries()

    this.projectForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      expiration_date: ['', [Validators.required]],


    });


  }



  allCountries() {
    this.ngxService.start();
    this.ServiceService.getallCountries().subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.countries = pdata.data
      this.ngxService.stop();
    });
  }


  changeCountry(e: any) {
    let state = e
    this.country_id = e.target.value
    console.log("state", e.target.value);
    this.ngxService.start();
    this.ServiceService.getallStates(this.country_id).subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.states = pdata.data
      this.ngxService.stop();
    });

  }

  changeStates(e: any) {
    let state = e
    this.state_id = e.target.value
    console.log("state", e.target.value);
    this.ngxService.start();
    this.ServiceService.getallCities(this.state_id).subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.cities = pdata.data
      this.ngxService.stop();
    });

  }




  submitData() {
    this.submitted = true;


    if (this.projectForm.invalid) {
      return alert('Invalid Details');
    }


    if (this.projectForm.valid) {
      console.log('form submitted');
    }


    if (this.submitted) {
      const { valid } =
        this.projectForm;

      if (valid) {
        this.reqBody = {
          ...this.projectForm.value,


        };




        this.ServiceService.createprojects(this.reqBody).subscribe(async (result) => {
          // this.ngxService.stop();
          if (result) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

              this.router.navigateByUrl('view');
            });
            alert("Item Added successfully ");
            console.log(this.reqBody);
          } else {
            console.log(result);

          }


        });
      }

      else {

        return this.projectForm.reset({});
      }

    }
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;
    return true;
  }

}
