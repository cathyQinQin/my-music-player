import {
    SET_USER,
    SET_TOKEN,
    SET_PLAYLISTS,
    SET_LOADING,
    SET_PLAYLISTS_ID,
    SET_DISCOVER_WEEKLY
} from './actions'
export const initialState = {
    user: null,
    token: null,
    playlists: [],
    playlistsId: null,
    playing: false,
    loading: false
};

export const reducer = (state: object, action: object) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload,
            };
        case SET_PLAYLISTS_ID:
            return {
                ...state,
                playlistsId: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_DISCOVER_WEEKLY:
            return {
                ...state,
                discover_weekly: action.payload,
            };
        default:
            return state;
    }
};