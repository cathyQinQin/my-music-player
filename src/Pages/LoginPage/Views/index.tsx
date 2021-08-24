import React from "react";
import "./index.less";
import { loginConfig } from '../../../../spotify'
import { useSelector } from "react-redux";
const Login = () => {
    const loading = useSelector(state => state.loading);
    return (
        <div className='login'>
            <img
                src="Spotify_Logo_RGB_White.png"
                alt="Spotify logo"
                className="logo"
            />
            {loading 
            ?
            <button className="login-btn" disabled>Loading...</button> 
            :
            <form action={loginConfig.url} method="GET">
                {Object.entries(loginConfig.parameters).map(([key,value])=> (
                    <input key={key} type="hidden" name={key} value={value}/>
                ))}
                <button className="login-btn">LOGIN WITH SPOTIFY</button>
            </form>
            }
            
        </div>
    );
}

export default Login;