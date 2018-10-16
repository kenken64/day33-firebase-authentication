import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Delivery } from '../model/delivery';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryCollection: AngularFirestoreCollection<Delivery>;
  
  constructor(private db: AngularFirestore) { 
    this.deliveryCollection = db
            .collection<Delivery>('delivery', ref => ref.orderBy('driver_name', 'asc'));
  }

  saveDelivery(delivery) {
    return of(this.deliveryCollection.add(delivery));
  }

  getAllDeliveries(): Observable<Delivery[]>{
    return this.deliveryCollection.valueChanges();
  }
}
