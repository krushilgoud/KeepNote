import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private httpClient: HttpClient) {}

    registerService(data: any): Observable<any> {
        return this.httpClient.post<any>('http://localhost:8200/api/v1/users/register', {
          username: data.username,
          password: data.password
        }, {
            headers: new HttpHeaders().set('content-type', `application/json`)
        });
    }
}
