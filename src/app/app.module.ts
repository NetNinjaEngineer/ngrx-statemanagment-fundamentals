import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { coursesReducer } from './courses/store/courses.reducers';
import { CourseFilterComponent } from './courses/course-filter/course-filter.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CounterComponent,
    HomeComponent,
    HeaderComponent,
    CourseFilterComponent,
    SearchCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      counter: counterReducer,
      courses: coursesReducer
    }),
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
