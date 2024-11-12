import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class InerceptknInterceptor implements HttpInterceptor {
  private UserIslogin = 'connexion';
  private postUser = 'add';

  
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('Authorization');
    let authservice = this.injector.get(UserService);

    if (request.url.endsWith(this.UserIslogin) === true || request.url.startsWith(this.postUser) === true) {

      // tslint:disable-next-line:no-shadowed-variable
      const tokenized = request.clone({
        setHeaders:{
          Authorization: ``

        }
      });
      return next.handle(tokenized);
    }else{

      const tokenized = request.clone({
        setHeaders:{
          Authorization: `Bearer ${authservice.gettoken()}`

        }
      });
      return next.handle(tokenized);
    }
  }
    
}
