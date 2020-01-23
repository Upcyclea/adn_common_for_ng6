/**
 * Created by aleksandr on 28.04.17.
 */
import { Injector } from '@angular/core';

/**
 * This class provides the ServiceLocator service
 * which has an instance of Injector to share services between each others
 */
export class ServiceLocator {
  /**
   * Instance of Injector
   */
  static injector: Injector;
}
