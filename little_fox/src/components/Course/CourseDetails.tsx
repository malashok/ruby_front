import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Courses.css"
import "../Login/Form.css"
import CourseInterface from "../../interfaces/CourseInterface.ts";
import { useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import ResponseInterface from "../../interfaces/ResponseInterface.ts";

const CourseDetails: React.FC = () => {
    const [course, setCourse] = useState<CourseInterface>({});
    const [teachers, setTeachers] = useState([]);
    const [faculty, setFaculty] = useState();
    const [responses, setResponses] = useState<ResponseInterface[]>([]);
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/courses/${id}.json`);
                const course  = response.data;
                console.log(localStorage["studentId"])
                setCourse(course);
                const teacherNames = course.teachers.map((teacher: any) => teacher.name);
                setTeachers(teacherNames);
                const facul = await axios.get(`http://127.0.0.1:3000/faculties/${course.faculty_id}.json`);
                setFaculty(facul.data.name)

                const res =  await axios.get(`http://127.0.0.1:3000/responses.json`);
                const allResponses = res.data;

                const filteredResponses = allResponses.filter((response) => response.course_id === course.id);

                setResponses(filteredResponses);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(`http://127.0.0.1:3000/responses.json`, {
                text: data.text,
                rating: parseInt(data.rating),
                course_id: course.id,
                student_id: localStorage["studentId"]
            });

            reset();
            setResponses(prevResponses => [...prevResponses, response.data]);
        } catch (error) {
            console.error("Error adding response:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/responses/${id}.json`);
            setResponses(prevResponses => prevResponses.filter(response => response.id !== id));
        } catch (error) {
            console.error("Error deleting response:", error);
        }
    };

    return (
        <div className="grid">
                <div key={course.id} className="card card__border">
                    <div className="card__title">{course.title}
                    </div>
                    <p className="card__content">{course.description} </p>
                    <p className="card__content">
                        Факультет: {faculty}
                    </p>
                    <p className="card__content">
                        Викладач: {teachers.join(", ")}
                    </p>
                </div>
            <div>
                <form className="form form__border" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label htmlFor="rating">Оцініть курс:</label>
                        <select
                            id="rating"
                            {...register("rating", { required: true })}
                        >
                        {[...Array(5).keys()].map((value) => (
                            <option key={value + 1} value={value + 1}>{value + 1}</option>
                        ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="text">Текст відгуку:</label>
                        <textarea
                            id="text"
                            {...register("text", { required: true })}
                        />
                    </div>
                    <button className="submit" type="submit">Submit</button>
                </form>
            </div>
            {responses.map(res => (
                <div key={res.id} className="card">
                    <div className="card__cont">
                    <div className="card__title"><b>Оцінка:</b> {res.rating}
                    </div>
                        {localStorage["studentId"] == res.student_id &&
                    <div onClick={() => handleDelete(res.id)} className="card__status"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg></div>}
                    </div>
                    <p className="card__content"><b>Відгук:</b> {res.text} </p>
                </div>
            ))}
        </div>
    );
};

export default CourseDetails;