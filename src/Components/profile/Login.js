import React from "react";
import "./Login.css"
import {signInWithGoogle} from '../../services/firebase';

function Login() {    

    return(
        <div className="login-btn">
            <button type="button" class="login-with-google-btn" onClick={signInWithGoogle}>Google</button>
        </div>
    );

}

export default Login;

