import './App.css';
import React from 'react';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage/Views';
import { getTokenFromUrl, getTokenAndPlayListId, getPlayListSongInfo } from "../spotify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SpotifyWebApi from "spotify-web-api-js";
import {
  setUser,
  setToken,
  setPlaylists,
  setPlaylistsId,
  setLoading,
} from '../actions'

function App() {
    const dispatch: any = useDispatch();
    const token = useSelector(state => state.token);
    const playlists = useSelector(state => state.playlists);
    const playlistsId = useSelector(state => state.playlistsId);
    const spotify = new SpotifyWebApi();

    useEffect(() => {
        getTokenAndPlayListId({spotify, dispatch, setToken, setPlaylistsId, setLoading});
    }, []);
    useEffect(()=>{
        getPlayListSongInfo({spotify, playlistsId, dispatch, setPlaylists});
    },[playlistsId]);
    
    return (
        <div className="App">
        { playlists.length == 0 ? <LoginPage/> : <MainPage/> }
        </div>
    );
}

export default App;