import React from "react"
import { registerUser} from "../../services/authentificationService";
import { mapFieldsToValues } from "../../services/mapFieldsToValuesService";

const Register = props => {
    let userCredentials = {};
    return (
         <form className="login-form">
              <input ref={input => userCredentials.email = input} type="text" placeholder="your email" />
              <input ref={input => userCredentials.username = input} type="text" placeholder="your username" />
              <input ref={input => userCredentials.password = input} type="password" placeholder="your password" />
              <button onClick={(e) => {
                  registerUser(mapFieldsToValues(userCredentials));
                  e.preventDefault();
              }}>sing up</button>
             <a href="/login">log in</a>
         </form>
    );
};

export default Register
