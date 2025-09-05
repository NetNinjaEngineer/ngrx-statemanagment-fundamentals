import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { loadCourses } from "./courses.actions";

export const coursesReducer = createReducer(
    initialState,
    on(loadCourses, state => {
        return {
            ...state,
            courses: [
                {
                    id: 1,
                    title: 'Angular Fundamentals',
                    description: 'Learn the basics of Angular framework, components, directives, and services.',
                    image: 'images/angular.png',
                    author: 'John Doe',
                    price: 49.99
                },
                {
                    id: 2,
                    title: 'React for Beginners',
                    description: 'Start building modern web applications with React, hooks, and functional components.',
                    image: 'images/react.jpeg',
                    author: 'Jane Smith',
                    price: 39.99
                },
                {
                    id: 3,
                    title: 'Node.js & Express',
                    description: 'Master backend development using Node.js, Express, and RESTful APIs.',
                    image: 'images/nodejs.png',
                    author: 'Mike Johnson',
                    price: 59.99
                }
            ]
        }
    })
);