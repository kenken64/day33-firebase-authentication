import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './services/delivery.service';
import { AuthService } from './services/auth.service';
import  { Delivery } from './model/delivery';
import { environment } from '../environments/environment';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
  loginForm :FormGroup;
  title = 'day26-angular-firebase';
  deliveriesArr : Delivery[];
  uploadAPI: string = environment.uploadUrl;
  currentUploadURL: string;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  spinnerFlag: boolean = false;
  multipleFilesUpload = [];
  
  uploadForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  constructor(private svc: DeliveryService, 
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private authService: AuthService){
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
    })
  }

  loginGoogle(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFacebook(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGithub(){
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  loginWithEmail(){
    const formValue = this.loginForm.value;
    this.authService.loginWithEmail(formValue.email, formValue.password)
          .subscribe(
              (result) => {
                console.log(result);
                
                this.authService.setFirebaseTokenToLocalstorage();
                
                setTimeout(function() {
                    //this.spinnerService.hide();
                    //this.router.navigate(['']);
                    console.log("delay ...");
                  }.bind(this), 4500);
                
              }
          )
  }

  logout(){
    this.afAuth.auth.signOut().then(result=>this.authService.destroyToken());
  }

  ngOnInit(){}

  saveDelivery(){
    let firstName = this.uploadForm.get("firstName").value;
    let lastName = this.uploadForm.get("lastName").value;
    console.log({... firstName});
    let fullName =  `${firstName} ${lastName}`;
    let d : Delivery = {
        driver_name:  fullName,
        vehicle_type: "Truck",
        area: "North",
        driverPhoto: this.multipleFilesUpload
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
    this.spinnerFlag = true;
    if(typeof(evtObj.body) !== 'undefined'){
      if(typeof(evtObj.body.filename) !== 'undefined'){
        console.log(evtObj.body.filename);
        this.currentUploadURL = evtObj.body.filename;
        this.multipleFilesUpload.push(this.currentUploadURL);
        this.spinnerFlag = false;
      }
    }
    
  }
}
