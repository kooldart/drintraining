import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../api/authentication/authentication.service'; 
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ErrorHandleService} from '../shared/services/error-handle.service';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private router : Router, private errorHandleS : ErrorHandleService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        let errorMsg = `Error: ${err.error.message}`;
        let expiredToken : boolean = false; 
        
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.auth.logout();
            expiredToken = true;
          }
        }
        this.errorHandleS.setErrorMessage(errorMsg);
        return throwError(err); 
      }),
    );
  }
}
