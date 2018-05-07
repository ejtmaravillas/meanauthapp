import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any; 
  user: any;
//private http: HttpClient) { }
  constructor(private http: HttpClient){}

  registerUser(user){
    user.username = user.username.toLowerCase();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{ headers });
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{ headers });  
  }
  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/users/profile', { headers });  
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings
    this.authToken = token;
    this.user = user;
  }
  
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log(token);
  }
  
  loggedIn() {
    if (this.authToken) {
      return true;
    } else {
      return false;
    }
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}


  /**registerUser(user) {
    user.username = user.username.toLowerCase();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers });
  }
  authenticateUser(user) {
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers });
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', { headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    if (this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}*/
