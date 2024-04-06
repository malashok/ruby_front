import {FormEventHandler, useEffect, useState} from "react";
import "./Form.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    errorMessage: string | null;
};

const LoginForm = (props: LoginFormProps) => {
    const { onSubmit, errorMessage } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // useEffect(() => {
    //     localStorage.clear(); //sign_out
    // }, []);

    const handleFormSubmit = (data: { email: string; password: string }) => {
        const formData = {
            user: {
                email: data.email,
                password: data.password
            }
        };
   console.log(formData);
        axios.post("http://127.0.0.1:3000/users/sign_in.json", formData)
            .then(response => {
                const { id, email, role } = response.data;
                localStorage.setItem("id", id);
                localStorage.setItem("role", role);
                console.log(localStorage["role"]);
                if (localStorage["role"] == "admin"){navigate("/admin")}
                if (role == "student"){navigate("/courses")}
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <p className="form-title">Увійти</p>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } })}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <button type="submit" className="submit">
                    Sign in
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
