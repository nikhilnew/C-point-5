import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/features/services/service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent {
 
  id:any
  items: any =[];


  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 50, 100];

  filterObj = {
    "limits": 2,
    "pages": 1,
  }
  // items: any[] | undefined;



  constructor(private ServiceService: ServiceService, private ngxService: NgxUiLoaderService,private router: Router) {

    // this.ServiceService.getAllJobs().subscribe((data: any) => {

    //   this.all_post = data;
    //   console.log(this.all_post);

    // });

  }

  ngOnInit(): void {

    this.postList();

  }


  postList(): void {

    this.id = {
      "RowId": 0
    }

    console.log('id', this.id);

    this.ngxService.start();
    this.ServiceService.getAlldata().subscribe((data: any) => {
      
      this.items = data
      this.ngxService.stop();
      console.log(this.items);
    });

  }

  onTabledataChange(event: any) {
    this.page = event;
    this.postList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  deletePost(id: any) {
    
    if (confirm("Are you sure to delete this Data?")) {
     
      this.ServiceService.deleteprojects(id).subscribe((data) => {
        
      });
      alert('Deleted successfully');
      window.location.reload();

    }
    
  }



  onPrevious() {
    this.filterObj.pages--;
    this.filetrCandidates();
  }

  onNext() {
    this.filterObj.pages++;
    this.filetrCandidates();
  }

  filetrCandidates() {

    console.log("abc", this.filterObj)

  }



}

