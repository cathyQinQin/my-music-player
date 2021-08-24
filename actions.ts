/*
 * action 类型
 */

export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const SET_PLAYLISTS_ID = 'SET_PLAYLISTS_ID'
export const SET_DISCOVER_WEEKLY = 'SET_DISCOVER_WEEKLY'
export const SET_LOADING = 'SET_LOADING'

export function setUser(text: string) {
    return { type: SET_USER, payload: text }
  }
  
export function setToken(text: string) {
    return { type: SET_TOKEN, payload: text }
}

export function setLoading(text: string) {
    return { type: SET_LOADING, payload: text }
}

export function setPlaylists(songList: Array<any>) {
    return { type: SET_PLAYLISTS, payload: songList }
}

export function setPlaylistsId(id: string) {
    return { type: SET_PLAYLISTS_ID, payload: id }
}
export function setDiscoverWeekly(text) {
    return { type: SET_DISCOVER_WEEKLY, payload: text }
}