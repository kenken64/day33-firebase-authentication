import { Component } from '@angular/core';
import { DeliveryService } from './services/delivery.service';
import  { Delivery } from './model/delivery';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day26-angular-firebase';
  deliveriesArr : Delivery[];
  uploadAPI = environment.uploadUrl;

  constructor(private svc: DeliveryService){
    
  }

  saveDelivery(){
    let d : Delivery = {
        driver_name: "Kenneth P",
        vehicle_type: "Truck",
        area: "North"
    }
    this.svc.saveDelivery(d);
  }

  getAllDelivery(){
    this.svc.getAllDeliveries().subscribe((result)=>{
      console.log(result);
      this.deliveriesArr = result;
    })
  }
}
