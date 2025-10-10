export interface ICourseV2 {
    id?: string,
    title: string,
    description: string,
    image: string,
    author: string,
    price: number,
    instructor: string,
    duration: number,
    rating: number,
    isActive: boolean,
    category: string
}