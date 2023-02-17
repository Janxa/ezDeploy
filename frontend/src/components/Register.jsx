import { useState } from "react";
import { registerSchema } from "../joi_schemas/register_schema";
import axios from "axios";
function Register(props) {
    const [data,setData] = useState( { username:"", email: "", password: "" });
    const [errors,setErrors]=useState({});
    const [emailsent,setEmailsent]=useState(false);
    const schema=registerSchema;

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
            await schema.validateAsync({username: data["username"], email: data["email"], password: data["password"]},{abortEarly: false});
        } catch (err) {
            console.log("Validation error:", err);
            err.details.forEach((error) => (console.log(error), errors[error.context.label] = error.message));
            setErrors(errors);
            return;
        }
        try {
            const res = await axios.post("/api/authentification/register", data);
            console.log("Login success:", res);
            setEmailsent(true)
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
    <div className=" flex flex-col">
        { !emailsent
        ?   <form onSubmit={handleSubmit} className="flex flex-col">
                    <h2 className="font-bold text-2xl text-color-yellow-primary  self-center ">Register</h2>
                    <label for="username" className="font-medium text-sm py-1">Username: </label>
                    <input onChange={handleChange} value={data.username} type="text" name="username" id="username_input" className={errors["username"] ? 'input-invalid': 'input'} />
                    {errors['username']  && <p className="font-medium text-sm py-1 text-color-red-primary">{errors["username"]}</p>}
                    <label for="email" className="text-sm font-medium py-1">Email: </label>

                    <input onChange={handleChange} value={data.email}  type="email" name="email" id="email_input" className={errors["email"] ? 'input-invalid': 'input'} />
                    {errors['email']  && <p className="font-medium text-sm py-1 text-color-red-primary">{errors["email"]}</p>}
                    <label for="password" className="text-sm font-medium py-1">Password: </label>

                    <input onChange={handleChange} value={data.password} type="password" name="password" id="password_input" className={errors["email"] ? 'input-invalid': 'input'} />
                    {errors['password']  && <p className="font-medium text-sm py-1 text-color-red-primary">{errors["password"]}</p>}
                    <button type="submit" className="my-2 py-2 bg-color-blue-primary hover:bg-color-blue-secondary font-medium text-sm rounded-md border-t">Register</button>
                    {errors['request']  && <p className="font-medium text-sm py-1 text-color-red-primary self-center">{errors["request"]}</p>}
                    <p  className="text-sm font-light self-center mt-2 ">Already got an account ?</p>
                    <button className="font-medium  text-color-blue-primary underline  decoration-dashed  "  onClick={ ()=> props.formSwitch("login")}>
                            Sign in
                    </button>
            </form>

        :   <div className="flex flex-col items-center">
                <h3 className="font-medium text-2xl text-color-yellow-primary mb-4">Check your mailbox !</h3>
                <p className="mb-2">To verify your account, you need to click on the link  we sent to <b>{data["email"]}</b>.</p>
                <p className="underline underline-offset-2">Dont forget to check your spams.</p>
            </div>
        }
    </div>
    );
}

export default Register;