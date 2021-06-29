import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HeaderAuthorizationInterceptor implements HttpInterceptor {
    constructor( ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
            const request_clone = request.clone({ setHeaders: { Authorization: "Token "  } });
            return next.handle(request_clone);
        
        return next.handle(request);
    }
}
