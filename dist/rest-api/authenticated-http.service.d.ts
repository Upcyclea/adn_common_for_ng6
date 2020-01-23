import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
export declare class AuthenticatedHttpService extends Http {
    private _router;
    constructor(backend: XHRBackend, defaultOptions: RequestOptions, _router: Router);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
}
