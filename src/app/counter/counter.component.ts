import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCount } from './state/counter.selector';
import { CounterState } from './state/counter.state';
import { decrement, increment, incrementBy, reset } from './state/counter.actions';
import { LoggerService } from '../core/services/logger.service';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.css',
    standalone: false
})
export class CounterComponent implements OnInit {
  count$: Observable<number> | null = null;
  // count: number = 0;
  counterSubscription: Subscription | null = null;
  value: number = 0;

  constructor(private readonly store: Store<{ counter: CounterState }>,
    private readonly loggerService: LoggerService
  ) { }


  ngOnInit(): void {

    this.loggerService.log('CounterComponent initialized');

    this.count$ = this.store.select(selectCount);
  }

  // ngOnInit(): void {
  //   this.counterSubscription = this.store.select(selectCount).subscribe(count => {
  //     this.count = count;
  //   })
  // }

  // ngOnDestroy(): void {
  //   if (this.counterSubscription) {
  //     this.counterSubscription.unsubscribe();
  //   }
  // }

  incrementByInput() {
    this.store.dispatch(incrementBy({ value: this.value }))
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
