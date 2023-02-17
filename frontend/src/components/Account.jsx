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

    const formSwitch =(new_state) => {
        setDisp(new_state);
    };

    return (
    <main className="mx-auto mt-48 md:mt-32 w-11/12 flex">
        <div className="bg-color-bg-dark w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md  flex flex-col">

            {disp === 'login'?<Login formSwitch={formSwitch}/>: false}
            {disp === 'register'? <Register formSwitch={formSwitch} />: false}

        </div>
    </main>
    );
}

export default Account;