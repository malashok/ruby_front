import {useEffect, useState} from "react";
import axios from "axios";
import "./Courses.css"
import "./Input.css"
import CourseInterface from "../../interfaces/CourseInterface.ts";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const CoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<CourseInterface[]>([]);
    const { register, handleSubmit } = useForm<{ search: string }>();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/courses.json`);
                setCourses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const onSubmit = async (data: { search: string }) => {
        if (data.search !== ''){
            const filteredCourses = courses.filter(course =>
                course.title.toLowerCase().includes(data.search.toLowerCase())
            );
            setCourses(filteredCourses);
        } else {
            const response = await axios.get(`http://127.0.0.1:3000/courses.json`);
            setCourses(response.data);
        }
    };

    return (
        <div className="grid">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <input
                    type="text"
                    className="input"
                    id="search"
                    placeholder="Пошук"
                    autoComplete="off"
                    {...register("search")}
                />
                <button className="button--submit" type="submit">Шукати</button>
            </div>
            </form>
            {courses.map(course => (
                <div key={course.id} className="card">
                    <h3 className="card__title">{course.title}
                    </h3>
                    <p className="card__content">{course.description} </p>

                    <Link to={`/courses/${course.id}`} className="card__arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                        </svg>
                    </Link>
                </div>
            ))}

        </div>
    );
};

export default CoursesPage;