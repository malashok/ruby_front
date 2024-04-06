import TeacherInterface from "./TeacherInterface.ts";

interface CourseInterface{
    id: number;
    title: string;
    description: string;
    faculty_id: number;
    teachers: TeacherInterface[];
}

export default CourseInterface;