import { useState } from "react";
import { loginSchema } from "../joi_schemas/login_schema";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authentification.service";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import EmailVerificationMessage from "./EmailVerificationMessage";
function Login(props) {

    const [data,setData] = useState( { email: "", password: "" });
    const [errors,setErrors]=useState({});
    const [emailSent,setEmailSent]=useState(false);
    const schema=loginSchema;
    const navigate=useNavigate();

    const handleChange = ({currentTarget:input}) => {
        setData((data) => {
            console.log(data,[input.name],input.value);
            return{
              ...data,
              [input.name]:input.value
            }
        }
        );
    }
    const handleLogin = async (event)=> {
        event.preventDefault();
        let errors = {};
        try {
            await schema.validateAsync({email: data["email"], password: data["password"]},{abortEarly: false});
            // navigate("/profile");
            // window.location.reload();
        } catch (err) {
            console.log("Validation error:", err);
            err.details.forEach((error) => (console.log(error), errors[error.context.label] = error.message));
            setErrors(errors);
            return;
        }
        try {
            const res = await AuthService.login(data["email"],data["password"])
            console.log("Login success:", res);
            navigate('/dashboard')
        } catch (error) {
            console.log("Login error:", error);
            if (error.response.status==500) {
                errors["request"] = "Server Error. Check your connexion or try again later";

            } else if (error.response.data['Error']=="Not validated") {
                errors["request"] = (
                    <ErrorMessage
                      message="Your email has not been validated, please check your emails or "
                      onButtonClick={resendEmail}
                      buttonContent="Resend one"
                    />
                );

                }else if (error.response){
                errors["request"] = error.response.data.error;

                    } else {
                        errors["request"] = error.request.statusText;
                }
            setErrors(errors);
            console.log(errors)
        }
    };
    const resendEmail= async () =>{
        try {
            const res = await axios.post("/api/authentification/resend", {email: data["email"]});
            setEmailSent(true)
        } catch (error) {
            console.log("Login error:", error);
            if (error.response.status==500) {
                errors["request"] = "Server Error. Check your connexion or try again later";

            } else if (error.request) {
                errors["request"] = error.response.data.error;
            } else {
                errors["request"] = error.request.statusText;
            }
        }
    };


    return (
    <div className="flex flex-col">
        {!emailSent
            ?
            <form onSubmit={handleLogin} className="flex flex-col">

                <h2 className="font-bold text-2xl text-color-yellow-primary  self-center">Sign in</h2>
                <label htmlFor="email" className="font-medium text-sm py-1">Email:</label>
                <input onChange={handleChange} value={data.email} type="email" name="email" id="email" className={errors["email"] ? 'input-invalid': 'input'} />
                {errors['email']  && <p className="font-medium text-sm py-1 text-color-red-primary">{errors["email"]}</p>}
                <label htmlFor="password" className="text-sm font-medium py-1">Password:</label>
                <input onChange={handleChange} value={data.password} type="password" name="password" id="password" className={errors["password"] ? 'input-invalid': 'input'} />
                {errors['password']  && <p className="font-medium text-sm py-1 text-color-red-primary">{errors["password"]}</p>}
                <button type="submit" className="my-2 py-2 bg-color-blue-primary hover:bg-color-blue-secondary font-medium text-sm rounded-md border-t">Login</button>
                {errors['request']  && <p className="font-medium text-sm py-1 text-color-red-primary self-center">{errors["request"]}</p>}
                <p className="text-sm font-light self-center mt-2 " >No account yet ?</p>
                <button className=" font-medium  text-color-blue-primary underline  decoration-dashed  " onClick={ ()=> props.formSwitch("register")}>Sign up </button>
            </form>

            :
            <EmailVerificationMessage resendEmail={resendEmail} email={data.email} />
        }
    </div>
    );
}

export default Login;