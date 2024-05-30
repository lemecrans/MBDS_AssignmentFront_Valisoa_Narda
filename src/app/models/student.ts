import { Assignment } from "./assignmet";

export interface Student {
    id: string;
    pseudo: string;
    assignments: Assignment[];
}
export interface ResponseItem {
    student: Student;
}