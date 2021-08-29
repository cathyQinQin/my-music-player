export default {
    install() {
        this.ready = new Promise(resolve => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(Spotify.Player)
            }
        })
    },
    async getPlayer(token) {
        const Player = await this.ready

        const player = new Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); }
        });

        let device_ID
            // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            device_ID = device_id
            console.log('Ready with ddd', device_ID);
        });
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();

        const play = ({
            spotify_uri,
            playerInstance: {
                _options: {
                    getOAuthToken,
                    device_ID
                }
            }
        }) => {
            getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_ID}`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [spotify_uri] }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                });
            });
        };

        play({
            playerInstance: player,
            spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        });
        return player
    },
}