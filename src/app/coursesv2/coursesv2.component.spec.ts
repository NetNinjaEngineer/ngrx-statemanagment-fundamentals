import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coursesv2Component } from './coursesv2.component';

describe('Coursesv2Component', () => {
  let component: Coursesv2Component;
  let fixture: ComponentFixture<Coursesv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Coursesv2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coursesv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
