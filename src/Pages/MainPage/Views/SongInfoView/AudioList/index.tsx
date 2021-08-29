import React from 'react';
// "title": item.track.name,
// "audioSrc": item.track.preview_url,
// "artist": item.track.artists[0].name,
// "length": item.track.duration_ms,
// "albumName": item.track.album.name,
// "image": item.track.album.images[0].url
const AudioList = ({ title, audioSrc, artist, length, albumName, image } => {
    return(
        <div className="tracklist-row">
            <div className="song-header">
                <div className="song-image">
                    
                </div>
                <div className="song-info">
                    <div className="song-title">{title}</div>
                    <div className="song-artist">{artist}</div>
                </div>
            </div>
            <div className="song-album">{albumName}</div>
            <div className="song-duration">{length}</div>
        </div>
    )
}
export default AudioList;