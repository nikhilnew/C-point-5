import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, } from '@angular/forms';
// import { getDate } from 'date-fns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
// import { ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/features/services/service.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent {
  EditForm: any = FormGroup;
  submitted = false;

  getPname: any;
  reqbody: any;

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
  Code: any;
  getData: any;
  getProject: any;


  constructor(private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService, private ServiceService: ServiceService,
    private router: Router, private activatedRoute: ActivatedRoute,) {

    this.activatedRoute.paramMap.subscribe(x => {
      this.Code = x.get('Code');
      console.log(this.Code);
    });
    this.repositoryForm = this.formBuilder.group({
      repository: this.formBuilder.array([])
    });
  
    console.log("..........", this.Code);
    this.ngxService.start();
  // ...

  this.ServiceService.getByIDProject(this.Code).subscribe((data: any) => {
    this.getData = data.data;
    this.ngxService.stop();
    console.log("data......", data.data); // Check the structure of the received data
  
    // if (data && data.data && data.data.length > 0) { // Check if 'data' is not undefined, 'data.data' is not undefined, and it has items
      this.EditForm.patchValue({
        'Code': this.Code,
        'GSTNo': this.getData?.GSTNo, // Access the 'GSTNo' property directly from 'this.getData'
        'PANNo': this.getData?.PANNo,
        'Name': this.getData?.Name,
        'Address': this.getData?.Address,
        'Pincode': this.getData?.Pincode,
        'Country': this.getData?.Country,
        'State': this.getData?.State,
        'City': this.getData?.City,
        'MobileNo': this.getData?.MobileNo,
        'Email': this.getData?.Email,
        'Latitude': this.getData?.Latitude,
        'Longitude': this.getData?.Longitude,
        'Currency': this.getData?.Currency,
      });
  
      // ...
  
      const repository = this.getData?.repository; // Use optional chaining to handle undefined
      const repositoryArray = this.repositoryForm.get('repository') as FormArray;
      repositoryArray.clear();
      
      if (repository) {
        repository.forEach((details: any) => {
          repositoryArray.push(
            this.formBuilder.group({
              'Name': details.Name,
              'MobileNo': details.MobileNo,
              'Email1': details.Email1,
              'Department': details.Department,
              'Designation': details.Designation,
              'Code': this.Code,
            })
          );
        });
      }
      
    // } 
    // else {
    //   console.log("Data not found or empty");
    // }
  });
  
  


  }


  ngOnInit(): void {
    this.allCountries()

    this.EditForm = this.formBuilder.group({

      GSTNo: [''],
      PANNo: [''],
      Code: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: [''],
      // project_owner_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Pincode: [''],
      Country: [''],
      State: [''],
      City: [''],
      MobileNo: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Latitude: [''],
      Longitude: [''],
      Currency: [''],
      // cliente_email_id: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],


    });





    //....................repository
    this.repositoryForm = new FormGroup({
      repository: new FormArray([
        new FormGroup({
          Name: new FormControl('', [Validators.required]),
          MobileNo: new FormControl('', [Validators.required]),
          Email1: new FormControl(''),
          Department: new FormControl('', [Validators.required]),
          Designation: new FormControl('', [Validators.required]),
          Code: new FormControl(this.getPname),

        }),
      ]),
    });



  }
  get repository(): FormArray {
    return this.repositoryForm.get('repository') as FormArray;
  }


  get f() { return this.EditForm.controls; }

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




  getprojectname(e: any) {
    console.log("e.target.value", e.target.value);


    this.getPname = e.target.value


    this.repository.patchValue([{ Code: this.getPname }])


  }



  // ...............................repository

  // get repository(): FormArray {
  //   return this.repositoryForm.get('repository') as FormArray;
  // }


  // get address(): FormArray {
  //   return this.addressForm.get('address') as FormArray;
  // }

  addrepository() {

    this.repository.push(
      new FormGroup({
        Name: new FormControl(''),
        MobileNo: new FormControl(''),
        Email1: new FormControl(''),
        Department: new FormControl(''),
        Designation: new FormControl(''),
        Code: new FormControl(this.getPname),

      })
    );



    // console.log(this.getPname);

    console.log("val..........", this.repository.value);

  }
  removerepository(i: number) {
    this.repository.removeAt(i);
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

  updateproject() {
    console.log("addProject", this.EditForm.value);
    console.log(this.EditForm.value);
    console.log(this.repositoryForm.value);



    this.reqbody = {
      ...this.EditForm.value,
      ...this.repositoryForm.value
    };
    this.ServiceService.updateProject(this.Code, this.reqbody).subscribe((data) => {
      console.log("getProject", this.reqbody);
      alert("Project Successfully Updated.");
      this.router.navigate(['view']);
    });
  }
}
