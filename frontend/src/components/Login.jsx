import { useState } from "react";
import { loginSchema } from "../joi_schemas/login_schema";
import axios from "axios";
function Login(props) {

    const [data,setData] = useState( { email: "", password: "" });
    const [errors,setErrors]=useState({});
    const schema=loginSchema;

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
    const handleSubmit = async (event)=> {
        event.preventDefault();
        let errors = {};
        try {
            await schema.validateAsync({email: data["email"], password: data["password"]},{abortEarly: false});
        } catch (err) {
            console.log("Validation error:", err);
            err.details.forEach((error) => (console.log(error), errors[error.context.label] = error.message));
            setErrors(errors);
            return;
        }
        try {
            const res = await axios.post("/api/authentification/login", data);
            console.log("Login success:", res);
        } catch (error) {
            console.log("Login error:", error);
            if (error.response.status==500) {
                errors["request"] = "Server Error. Check your connexion or try again later";

            } else if (error.request) {
                errors["request"] = error.response.data.error;
            } else {
                errors["request"] = error.request.statusText;
            }
            setErrors(errors);
            console.log(errors)
        }
    };


    return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
    );
}

export default Login;