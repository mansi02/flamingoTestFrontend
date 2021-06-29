import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from 'app/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,

  ) { }

  update(param , user_id): Observable<any> {
    return this.http.put(CONFIG.server_url + "/auth/update_user/"+user_id+'/', param 
    )}

  delete(param): Observable<any> {
    return this.http.post(CONFIG.server_url + "/auth/delete_user", param);
  }
  activate(param): Observable<any> {
    return this.http.post(CONFIG.server_url + "/auth/activate_user", param);
  }
}

