import React from "react"
import { authentificateUser } from "../../services/authentificationService";
import { mapFieldsToValues } from "../../services/mapFieldsToValuesService";

const Login = props => {
    let userCredentials = {};
    return (
         <form className="login-form">
              <input ref={input => userCredentials.email = input} type="text" placeholder="your email" />
              <input ref={input => userCredentials.password = input} type="password" placeholder="your password" />
              <button onClick={(e) => {
                  authentificateUser(mapFieldsToValues(userCredentials));
                  e.preventDefault();
              }}>log in</button>
         </form>
    );
};

export default Login
