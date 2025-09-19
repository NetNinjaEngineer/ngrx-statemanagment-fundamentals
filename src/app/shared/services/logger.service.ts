import { Injectable } from '@angular/core';
// DI 
// Provider ==> is responsible for creating and delivering a service
// Injector ===> is responsible for maintaining a container of providers and injecting them into classes upon request
// Token ==> is a unique identifier used to register and retrieve dependencies from the injector

@Injectable({
  providedIn: 'root' // application level // singleton // single instance
})
export class LoggerService {

  constructor() { }

  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

}
