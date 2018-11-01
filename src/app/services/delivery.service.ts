import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Delivery } from '../model/delivery';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryCollection: AngularFirestoreCollection<Delivery>;
  
  constructor(private db: AngularFirestore, private http: HttpClient) { 
  }

  saveDelivery(delivery){

    return this.http.post<Delivery>(`${environment.apiUrl}delivery-person`, delivery);
  }

  getAllDeliveries(): Observable<Delivery[]>{
    return this.http.get<Delivery[]>(`${environment.apiUrl}delivery-person`);
  }
}
