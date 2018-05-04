import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

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
  constructor(private validateService: ValidateService){}
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
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      console.log('Please fill in all fields');
      return false;
    }

    // Required Email
    if(!this.validateService.validateRegister(user)){
      console.log('Please use a valid email');
      return false;
    }
  }
}
