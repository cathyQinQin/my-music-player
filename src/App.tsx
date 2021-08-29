import './App.css';
import React, { useEffect } from 'react';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage/Views';
import SpotifyAPI from './api/SpotifyAPI';
import SpotifyPlayer from './SpotifyPlayer';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { setToken, setTokenisNotExpired } from './slices/tokenSlice';
import { getMyFirstPlayListID, getMyFirstPlayList, setLoading } from './slices/musicListSlice'
import { useDispatch, useSelector } from 'react-redux';
export default function App() {
    const access_token = useSelector(state => state.token.value)
    const playlist_id = useSelector(state => state.musicList.id)
    const playlist = useSelector(state => state.musicList.value)
    const dispatch = useDispatch();
    const handleSaveTokenAndExpiry = () => {
        const [get_token, get_expiry] = SpotifyAPI.saveToken()
        dispatch(setToken(get_token))
        dispatch(setTokenisNotExpired())
        dispatch(setLoading())
    }
    // const a = SpotifyAPI.getMusicListId("")
    useEffect(()=>{
        dispatch(getMyFirstPlayListID(access_token))
    },[access_token])
    useEffect(()=>{
        dispatch(getMyFirstPlayList({ access_token,playlist_id }))
    },[playlist_id])
    // useEffect(()=>{
    //     SpotifyPlayer.getPlayer(access_token)
    // },[playlist])
    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path='/callback'
                    render={() => {
                        handleSaveTokenAndExpiry()
                        return (
                            <Redirect to="/" />
                        )
                    }}>
                </Route>
                <Route path="/">
                    {playlist.length != 0 ? <MainPage /> : <LoginPage />}
                </Route>
            </Switch>
        </div >
    );
}