import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, incrementBy, reset } from './state/counter.actions';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from './state/counter.state';
import { selectCount } from './state/counter.selector';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit {
  count$: Observable<number> | null = null;
  // count: number = 0;
  counterSubscription: Subscription | null = null;
  value: number = 0;

  constructor(private readonly store: Store<{ counter: CounterState }>) { }


  ngOnInit(): void {
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
