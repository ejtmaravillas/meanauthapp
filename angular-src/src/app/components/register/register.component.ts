import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
//import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  //errSwitch = false;
  //succSwithc = false;
  //submitSwitch = false;
  //errMsg: String;
  //succMsg: String;

  //constructor(private validateService: ValidateService, private authService: AuthService) { }
  constructor(private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit() {
  }
  onRegisterSubmit(){
  //onRegisterSubmit(form){
    // Validate Email
    //if (!this.validateService.validateEmail(form.value.email)) {
    //  this.errSwitch = true;
    //  this.errMsg = 'Please use a valid email';
    //  return false;
    //}
    
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Required Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout:3000});
      return false;
    } 
    //else{
     // this.flasMessage.show('Email Accepted', {cssClass: 'alert-success', timeout:3000});
    //}

    //// Register User
    this.authService.registerUser(user).subscribe((data: any) => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
    }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
      }
    });

  }
}
