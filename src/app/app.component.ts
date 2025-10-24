import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, from, fromEvent, map, Observable, of, Subject } from 'rxjs';
import { SharedState } from './shared/store/shared.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getIsLoading } from './shared/store/shared.selectors';
import { AuthState } from './auth/store/auth.state';
import { authLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AppComponent implements OnInit {
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  // errMessageSignal!: Signal<string>;

  // names: string[] = ['Mohamed', 'Ali', 'Ahmed', 'Mona', 'Haneen'];

  // @ViewChild('createBtn') createBtnRef!: ElementRef;

  // myObservable = from([10, 20, 30, 40, 50]);

  // transformedObservable = this.myObservable.pipe(
  //   map((value) => value * 5)
  // );

  // filteredObservable = this.transformedObservable.pipe(
  //   filter((value) => value % 4 == 0)
  // );





  constructor(private readonly store: Store<{ shared: SharedState, auth: AuthState }>) {
    this.showLoading$ = this.store.select(getIsLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);

    // this.errMessageSignal = this.store.selectSignal(getErrorMessage);


  }

  // myObservable = from(this.names) // takes iteratable
  // myObservable = of(10, this.names) // takes any argument

  ngOnInit(): void {

    // this.transformedObservable.subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   }
    // })

    // console.log('-------------------------');


    // this.filteredObservable.subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   }
    // })

    // this.myObservable.subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   }
    // });

    this.store.dispatch(authLogin());

    // observable not emits the same data (unicast)
    // let obs = new Observable((observer) => observer.next(Math.random()));

    // // sub1
    // obs.subscribe((data) => console.log(data));

    // // sub2
    // obs.subscribe((data) => console.log(data));

    // subject emits the same data (Multicast)

    // let sub = new Subject();

    // sub.subscribe((data) => console.log(data));
    // sub.subscribe((data) => console.log(data));

    // sub.next(Math.random());

    // BehaviourSubject its takes an initial value

    // let sub = new BehaviorSubject<number>(Math.random());
    // sub.subscribe((data) => console.log(data));
    // sub.subscribe((data) => console.log(data));

  }

  // btnClicked() {
  //   let count: number = 0;
  //   fromEvent(this.createBtnRef.nativeElement, 'click').subscribe((data) => {
  //     console.log(data);
  //     this.createNewItem(++count);
  //   })
  // }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.

  //   this.btnClicked();
  // }

  // createNewItem(count: number) {
  //   const item = document.createElement('div');
  //   item.innerText =  `item ${count}`;
  //   const container = document.getElementById('container');
  //   container?.appendChild(item);
  // }

}
