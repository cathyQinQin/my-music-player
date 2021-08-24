const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

export const loginConfig = {
    url: "https://accounts.spotify.com/authorize",
    parameters: {
        client_id: "12f43a9e50fc400581ee8d65184b0414",
        redirect_uri: "http://localhost:3000/callback",
        scope: scopes.join(" "),
        response_type: "token",
        show_dialog: "true"
    }
}

export const getTokenAndPlayListId = ({ spotify, dispatch, setToken, setPlaylistsId, setLoading }) => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash['access_token'];
    if (_token) {
        spotify.setAccessToken(_token);
        dispatch(setToken(_token))
        spotify.getUserPlaylists()
            .then(function(data) {
                dispatch(setPlaylistsId(data.items[0].id));
                console.log('User playlists', data.items[0]);
            });
        dispatch(setLoading(true));
    }
}
export const getPlayListSongInfo = ({ spotify, playlistsId, dispatch, setPlaylists }) => {
    if (playlistsId) {
        spotify.getPlaylistTracks(playlistsId)
            .then(function(data) {
                console.log('User', data);
                const arraryOfSong = data.items.map((item) => {
                    return {
                        "title": item.track.name,
                        "audioSrc": item.track.preview_url,
                        "artist": item.track.artists[0].name,
                        "length": item.track.duration_ms,
                        "albumName": item.track.album.name,
                        "image": item.track.album.images[0].url
                    }
                });
                console.log(arraryOfSong);
                dispatch(setPlaylists(arraryOfSong));
            });
    }
}