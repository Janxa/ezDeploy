import React, { useContext } from 'react';
import { Route, Routes,Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
function PrivateRoute({ element, ...rest }) {
    const { isLoggedIn } = useContext(AuthContext);
    console.log(element)
    console.log("authentified," , isLoggedIn)
    console.log(isLoggedIn ? "true":"false")
    return (<>
        {isLoggedIn ? element  : <Navigate to="/account" replace={true}/>}
        </>
    );
  }

  export default PrivateRoute;
