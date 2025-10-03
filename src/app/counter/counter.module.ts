import { NgModule } from '@angular/core';
import { CounterRoutingModule } from './counter-routing.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { CounterComponent } from './counter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    SharedModule,
    CounterRoutingModule,
    FormsModule,
    StoreModule.forFeature('counter', counterReducer)
  ],
  exports: [],
  // providers: [LoggerService] // module level  
})
export class CounterModule { }
