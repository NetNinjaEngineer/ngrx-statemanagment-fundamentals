import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseButtonComponent } from './create-course-button.component';

describe('CreateCourseButtonComponent', () => {
  let component: CreateCourseButtonComponent;
  let fixture: ComponentFixture<CreateCourseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCourseButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
