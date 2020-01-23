/**
 * Created by aleksandr on 28.04.17.
 */

import { RequestOptionsArgs } from '@angular/http';
import { RequestHeadersArgs } from './request-headers-args.interface';

/**
 * Interface for classes that represent a REST server config.
 * @interface
 */
export interface IApiConfig {

  /**
   * return the REST api url
   */
  api_url: string;

  /**
   * Enable/disable requests debug info
   */
  isDebug: boolean;

  /**
   * return default options for Request
   */
  options: RequestOptionsArgs;

  /**
   * return default headers for Request
   */
  headers: RequestHeadersArgs;
}
