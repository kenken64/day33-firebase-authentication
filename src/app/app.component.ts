import { Component } from '@angular/core';
import { DeliveryService } from './services/delivery.service';
import  { Delivery } from './model/delivery';
import { environment } from '../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day26-angular-firebase';
  deliveriesArr : Delivery[];
  uploadAPI = environment.uploadUrl;
  currentUploadURL: string;

  uploadForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  
  constructor(private svc: DeliveryService, private snackBar: MatSnackBar){
    
  }

  saveDelivery(){
    let firstName = this.uploadForm.get("firstName").value;
    let lastName = this.uploadForm.get("lastName").value;
    console.log({... firstName});
    let fullName =  `${firstName} ${lastName}`;
    let d : Delivery = {
        driver_name:  fullName,
        vehicle_type: "Truck",
        area: "North",
        driverPhoto: this.currentUploadURL
    }
    this.svc.saveDelivery(d).subscribe((result)=>{
      console.log("snack time !");
      let snackBarRef = this.snackBar.open('Driver Added');
    });
  }

  getAllDelivery(){
    this.svc.getAllDeliveries().subscribe((result)=>{
      console.log(result);
      this.deliveriesArr = result;
    })
  }

  doneUpload(evt){
    console.log(evt.file);
    console.log(">>>" + JSON.stringify(evt.event));
    let evtObj = {... evt.event};
    console.log(">>>" + evtObj);
    if(typeof(evtObj.body) !== 'undefined'){
      if(typeof(evtObj.body.filename) !== 'undefined'){
        console.log(evtObj.body.filename);
        this.currentUploadURL = evtObj.body.filename;
      }
    }
    
  }
}
