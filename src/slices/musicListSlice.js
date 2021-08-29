import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SpotifyAPI from '../api/SpotifyAPI'

export const getMyFirstPlayListID = createAsyncThunk(
    'music/getMyFirstMusicListID',
    async(userToken) => {
        const response = await SpotifyAPI.getMusicListId(userToken)
        return response.items[0].id
    })

export const getMyFirstPlayList = createAsyncThunk(
    'music/getMyFirstMusicList',
    async(args) => {
        const { access_token, playlist_id } = args
        const data = await SpotifyAPI.getMusicList(access_token, playlist_id)
        console.log("data", data)
        const arraryOfSong = data.tracks.items.map((item) => {
            return {
                "id": item.track.uri,
                "title": item.track.name,
                "audioSrc": item.track.preview_url,
                "artist": item.track.artists[0].name,
                "length": item.track.duration_ms,
                "albumName": item.track.album.name,
                "image": item.track.album.images[0].url
            }
        })
        return arraryOfSong
    })

export const getMusicPlayerReady = createAsyncThunk(
        'music/getMyMusicListReady',
        async(args) => {
            const { access_token, playlist_id } = args
            const data = await SpotifyAPI.getMusicList(access_token, playlist_id)
            console.log("data", data)
            const arraryOfSong = data.tracks.items.map((item) => {
                return {
                    "id": item.track.uri,
                    "title": item.track.name,
                    "audioSrc": item.track.preview_url,
                    "artist": item.track.artists[0].name,
                    "length": item.track.duration_ms,
                    "albumName": item.track.album.name,
                    "image": item.track.album.images[0].url
                }
            })
            return arraryOfSong
        })
    // Define the initial state using that type
const initialState = {
    value: [],
    id: "",
    ready: false,
    loading: false,
}

export const musicList = createSlice({
    name: 'musicList',
    initialState,
    reducers: {
        setLoading: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.loading = true
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getMyFirstPlayListID.fulfilled, (state, action) => {
            // Add user to the state array
            state.id = action.payload
        })
        builder.addCase(getMyFirstPlayList.fulfilled, (state, action) => {
            // Add user to the state array
            state.value = action.payload
        })
        builder.addCase(getMusicPlayerReady.fulfilled, (state) => {
            // Add user to the state array
            state.ready = true
        })
    },
})
export const { setLoading } = musicList.actions
export default musicList.reducer