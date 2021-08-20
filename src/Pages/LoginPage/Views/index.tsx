import React from "react";
import "./index.less";
import { loginUrl } from "./spotify.js";
const Login = () => {
    return (
        <div className='login'>
            <img
                src="Spotify_Logo_RGB_White.png"
                alt="Spotify logo"
                className="logo"
            />
            <form action={loginUrl}>
                <button className="login-btn">LOGIN WITH SPOTIFY</button>
            </form>
        </div>
    );
}

export default Login;