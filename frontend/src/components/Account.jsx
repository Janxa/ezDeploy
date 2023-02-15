import { useState, useEffect} from "react";
import Login from "./Login";
import Register from "./Register";
import { useLocation } from "react-router-dom";



function Account() {
    //resetting state to prevent uncontrolled behaviors
    window.history.replaceState({}, document.title)
    let { state } = useLocation();
    const [disp,setDisp]= useState(state?.disp || 'login' )


    useEffect(() => {
        setDisp(state?.disp || 'login' );
    }, [state]);

    const stateSwitch =(new_state) => {
        setDisp(new_state);
    };

    return (
    <main className="  mx-auto mt-48 w-11/12 flex">
        <div className=" bg-color-bg-dark w-3/4 m-auto p-5 shadow-md rounded-md  flex flex-col">

            {disp === 'login'
            ?   <>
                <Login />
                <p
                className="text-sm font-light self-center mt-2 " >No account yet ?</p>
                <button className=" font-medium  text-color-blue-primary underline  decoration-dashed  " onClick={ ()=> stateSwitch("register")}>Sign up </button>
                </>
            : false}
            {disp === 'register'
            ?   <>
                <Register />
                <p  className="text-sm font-light self-center mt-2 ">Already got an account ?
                </p>
                    <button className=" font-medium  text-color-blue-primary underline  decoration-dashed  "  onClick={ ()=> stateSwitch("login")}>
                        Sign in
                    </button>
                </>
            : false}

        </div>
    </main>
    );
}

export default Account;