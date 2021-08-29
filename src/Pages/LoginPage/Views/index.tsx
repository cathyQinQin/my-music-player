import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.less";
import SpotifyAPI from "../../../api/SpotifyAPI";
import { useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
const Login = () => {
    const loading = useSelector((state: RootStateOrAny) => state.musicList.loading)
    // const dispatch = useDispatch();
    const handleClick = () => {
        SpotifyAPI.redirectToOAuth()
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]);
    // SpotifyAPI.saveToken(dispatch, setToken, setExpiry);
    return (
        <div className='login'>
            <img
                src="Spotify_Logo_RGB_White.png"
                alt="Spotify logo"
                className="logo"
            />
            { loading 
            ?
            <button className="login-btn" disabled>Loading...</button>
            :
            <button className="login-btn" onClick={handleClick}>LOGIN WITH SPOTIFY</button>
            }
        </div>
    );
}

export default Login;