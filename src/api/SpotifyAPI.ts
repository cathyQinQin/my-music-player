import SpotifyWebApi from "spotify-web-api-js";
import { token } from "../slices/tokenSlice";
/**
 * API for all Spotify related actions
 */
class SpotifyAPI {
    /**
     * open url and redirect user to authenticate
     * 
     * @param
     * @returns
     * @throws
     */
    static redirectToOAuth() {
        const scopes = [
            "streaming",
            "user-read-email",
            "user-read-private",
            "playlist-read-private",
        ];

        const parameters = {
            client_id: "12f43a9e50fc400581ee8d65184b0414",
            redirect_uri: "https://my-spotify-react-player.web.app/callback/",
            scope: scopes.join(" "),
            response_type: "token",
            show_dialog: "true"
        }
        console.log(parameters)
        const url = new URL("https://accounts.spotify.com/authorize")

        Object.entries(parameters).forEach(([key, value]) => {
            url.searchParams.append(key, value)
        })
        location.replace(url.toString())
    }
    /**
     * save token and expiry seconds to store
     * 
     * @@returns {token: string, expiry_duration: string} 
     */
    static saveToken() {
        const getTokenFromUrl = () => {
            return window.location.hash
                .substring(1)
                .split("&")
                .reduce((initial, item) => {
                    let parts = item.split("=");
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                    return initial;
                }, { });
        };
        const tokens = getTokenFromUrl();
        console.log(tokens)
        return [tokens["access_token"], tokens["expires_in"]]
    }

    // return token
    // if token not in store or expiry, throw SpotifyTokenMissingException
    _getToken() {

    }

    _getPlayer() {

    }

    static async getMusicListId(token) {
        const api = new SpotifyWebApi()
        api.setAccessToken(token)
        return api.getUserPlaylists()
    }

    static getMusicList(token, id) {
        const api = new SpotifyWebApi()
        api.setAccessToken(token)
        return api.getPlaylist(id)
    }
}
export default SpotifyAPI;