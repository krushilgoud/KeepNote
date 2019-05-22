import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:8200/api/v1/users/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('token', token);
  }

  deleteBearerToken() {
    localStorage.removeItem('token');
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }

  isUserAuthenticated(): Promise<boolean> {
    console.log("Inside authenticationService.isUserAuthenticated ...");
    return this.httpClient.post('http://localhost:8100/api/v1/auth/verify', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    })
    .map((response) => {
      return response['isAuthenticated'];
    }).toPromise();
  }

  verifyUser() {
    console.log("Inside authenticationService.verifyUser ...");
    return this.httpClient.post('http://localhost:8100/api/v1/auth/verify', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    });
  }

  getUserDetails() {
    console.log("Inside authenticationService.getUserDetails ...");
    return this.httpClient.post('http://localhost:8100/api/v1/auth/verify', {}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    });
  }

  findUserByUsername(repicientId) {
    console.log("Inside authenticationService.findUserByUsername ...");
    return this.httpClient.get(`http://localhost:8200/api/v1/users/find?username=${repicientId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    });
  }
}
