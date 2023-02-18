import { useParams,Link } from 'react-router-dom';
import { useState } from 'react';
import { verifyEmailSchema } from '../joi_schemas/verifyEmail_schema';
import axios from 'axios';

function VerifyEmail() {
    const Code=useParams()
    const [verificationCode,setVerificationCode]=useState(Object.keys(Code).length !== 0 ? Code.verificationCode : "")
    const [errors,setErrors]=useState({})
    const [verified,setVerified]=useState(null)
    const schema=verifyEmailSchema;

    const handleChange = ({currentTarget:input}) => {
        setVerificationCode(input.value);
    }
    const handleSubmit = async (event) =>{
        let errors={}
        event.preventDefault()
        try {
            await schema.validateAsync({code:verificationCode})
        }
        catch (error){
            errors["code"]="The verification code is incorrect."
            setErrors(errors);
            return;
        }
        try {
           let res = await axios.get(`/api/authentification/verify/${verificationCode}`)
           setVerified(res.data)
        }
        catch(error) {
            console.log("Error :", error);
        }
    }
    return (
    <main className="mx-auto mt-48 md:mt-32 w-11/12 flex">
        {! verified ?
        <form onSubmit={handleSubmit} className="bg-color-bg-dark w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col ">
        <h2 className="font-bold text-2xl text-color-yellow-primary  self-center mb-2">Verify Email Adress</h2>
        <input type="text" onChange={handleChange} value={verificationCode} className="input" />
        {errors['code']  && <p className="font-medium text-sm py-1 text-color-red-primary self-center">{errors["code"]}</p>}
        <button type="submit" className="button">Validate</button>
        </form>
        :
        <div className="bg-color-bg-dark w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col ">
        <h2 className="font-bold text-2xl text-color-yellow-primary  self-center mb-2">Success</h2>
        <p>{verified}</p>
        <p>You can now <Link  className=" font-medium  text-color-blue-primary underline  decoration-dashed  " to="/account" state={{disp:'login'}}>Login</Link></p>
        </div>
}
    </main>
 );
}

export default VerifyEmail;