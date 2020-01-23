/**
 * Created by aleksandr on 28.04.17.
 */
import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';


/**
 * This class provides the AuthenticatedHttpService.
 * @inheritDoc
 */
@Injectable()
export class AuthenticatedHttpService extends Http {
  /**
   * Creates an instance of the AuthenticatedHttpService
   * @param backend
   * @param defaultOptions
   * @param _router
   * @constructor
   */
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private _router: Router) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request with error handler
   * to catch `authorized access` error and redirect to the login page
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((error: Response) => {
      if ((error.status === 401 || error.status === 403)) {
        this._router.navigate(['login']);
      }
      return Observable.throw(error);
    });
  }
}
