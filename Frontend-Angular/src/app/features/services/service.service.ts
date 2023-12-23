import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { from, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  success(arg0: string) {
    throw new Error('Method not implemented.');
  }

  // private apiUrl = environment.apiUrl;
  private apiUrl1 = environment.apiUrl1;
  private apiUrl2 = environment.apiUrl2;
  constructor(private http: HttpClient,private _toastr: ToastrService,) { }



  ToastPopup(errorMsg: string, errorModule: string, errorType: string) {
    switch (errorType) {
      case 'error':
        this._toastr.error(errorMsg, errorModule, {
          progressBar: true,
        });

        break;

      case 'info':
        this._toastr.info(errorMsg, errorModule, {
          progressBar: true,
        });

        break;

      case 'success':
        this._toastr.success(errorMsg, errorModule, {
          progressBar: true,
        });

        break;
    }
  }

  // getAllJobs(cdata: any): Observable<any> {
  //   console.log('check', cdata);
  //   return this.http.post(`${this.apiUrl}/GetData`, cdata);
  // }

  getAlldata(): Observable<any> {
  
    return this.http.get(`${this.apiUrl2}/get-items`);
  }

  
  deleteprojects(id: any) {
    console.log("check", id)
    console.log(id)
    return this.http.delete(`${this.apiUrl2}/departments/` + id);
  }

   getallCountries(): Observable<any>{
    return this.http.get(
      `${this.apiUrl1}/getcountry`);
  }

  getallStates(country_id:any): Observable<any>{
    return this.http.get(
      `${this.apiUrl1}/getstate/` + country_id
    );
  }

  getallCities(state_id:any): Observable<any>{
    return this.http.get(
      `${this.apiUrl1}/getcity/` + state_id
    );
  }

  createprojects(cdata: any) {
    console.log("check", cdata)
    return this.http.post(`${this.apiUrl2}/add-item`, cdata);
  }

  updateProject(Code:any,pdata: any,) {
    console.log("check", Code,pdata)
    console.log();
    
    return this.http.put(`${this.apiUrl2}/project/` + Code, pdata);
  }

  getByIDProject(Code: any) {
    return this.http.get(`${this.apiUrl2}/project/` + Code);
  }
}
