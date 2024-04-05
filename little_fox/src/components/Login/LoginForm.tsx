import { FormEventHandler } from "react";
import "./Form.css"

type LoginFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    errorMessage: string | null;
};


const LoginForm = (props: LoginFormProps) => {
    const { onSubmit, errorMessage } = props;
    return (
<div className="container">
        <form className="form">
            <p className="form-title">Увійти</p>
            <div className="input-container">
                <input type="email" placeholder="Enter email" />
          <span>
          </span>
            </div>
            <div className="input-container">
                <input type="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="submit">
                Sign in
            </button>
        </form>
</div>
);
};

export default LoginForm;