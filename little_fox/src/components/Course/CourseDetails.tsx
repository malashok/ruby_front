import {FormEventHandler, useEffect, useState} from "react";
import axios from "axios";
import "./Courses.css"
import "./Input.css"
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
                const { course, teachers } = response.data;
                setCourse(course);
                const teacherNames = teachers.map((teacher: any) => teacher.name);
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
            await axios.post(`http://127.0.0.1:3000/responses.json`, {
                text: data.text,
                rating: parseInt(data.rating),
                course_id: course.id,
                student_id: 10
            });

            reset();
        } catch (error) {
            console.error("Error adding response:", error);
        }
    };

    return (
        <div className="grid">
                <div key={course.id} className="card">
                    <h3 className="card__title">{course.title}
                    </h3>
                    <p className="card__content">{course.description} </p>
                    <p className="card__content">
                        Факультет: {faculty}
                    </p>
                    <p className="card__content">
                        Викладач: {teachers.join(", ")}
                    </p>
                </div>
            <div className="cont">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <label htmlFor="text">Response Text:</label>
                        <input
                            type="text"
                            id="text"
                            {...register("text", { required: true })}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            {...register("rating", { required: true })}
                        />
                    </div>
                    <button className="submit" type="submit">Submit</button>
                </form>
            </div>
            {responses.map(res => (
                <div key={res.id} className="card">
                    <h3 className="card__title">{res.rating}
                    </h3>
                    <p className="card__content">{res.text} </p>
                </div>
            ))}

        </div>
    );
};

export default CourseDetails;