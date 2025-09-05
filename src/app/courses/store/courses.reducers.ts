import { createReducer, on } from "@ngrx/store";
import { initialState } from "./courses.state";
import { filterCourses, loadCourses } from "./courses.actions";

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
                    price: 49.99,
                    instructor: 'John Doe',
                    duration: 12,
                    rating: 4.7,
                    isActive: true,
                    category: 'Frontend'
                },
                {
                    id: 2,
                    title: 'React for Beginners',
                    description: 'Start building modern web applications with React, hooks, and functional components.',
                    image: 'images/react.jpeg',
                    author: 'Jane Smith',
                    price: 39.99,
                    instructor: 'Jane Smith',
                    duration: 10,
                    rating: 4.5,
                    isActive: true,
                    category: 'Frontend'
                },
                {
                    id: 3,
                    title: 'Node.js & Express',
                    description: 'Master backend development using Node.js, Express, and RESTful APIs.',
                    image: 'images/nodejs.png',
                    author: 'Mike Johnson',
                    price: 59.99,
                    instructor: 'Mike Johnson',
                    duration: 15,
                    rating: 4.8,
                    isActive: true,
                    category: 'Backend'
                },
                {
                    id: 4,
                    title: 'JavaScript Essentials',
                    description: 'Understand core JavaScript concepts including ES6+, closures, and async programming.',
                    image: 'images/javascript.png',
                    author: 'Emily Carter',
                    instructor: 'Emily Carter',
                    price: 29.99,
                    duration: 8,
                    rating: 3,
                    isActive: true,
                    category: 'Frontend'
                },
                {
                    id: 5,
                    title: 'Database Fundamentals',
                    description: 'Learn SQL, relational databases, and how to model data for backend applications.',
                    image: 'images/database.png',
                    author: 'Robert Lee',
                    instructor: 'Robert Lee',
                    price: 34.99,
                    duration: 9,
                    rating: 3,
                    isActive: false,
                    category: 'Backend'
                }
            ]
        }
    }),
    on(filterCourses, (state, { filter }) => {
        return {
            ...state,
            coursesFilter: filter
        }
    })
);