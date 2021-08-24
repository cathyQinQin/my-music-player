import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import AudioControls from '../AudioControls';
import Backdrop from '../Backdrop';
import { useSelector } from 'react-redux';
const AudioPlayer = () => {
    const tracks: Array<any> = useSelector(state => state.playlists); 
    // State
    const[trackIndex, setTrackIndex] = useState(0);
    const[trackProgress, setTrackProgress] = useState(0);
    const[isPlaying, setIsPlaying] = useState(false);
    // Deconstructure
    const{ title, artist, audioSrc, image } = tracks[trackIndex];
    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef(0);
    const isReady = useRef(false);
    // Deconstructure again
    const{ duration } = audioRef.current;
    // Variables
    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;
    
    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
          setTrackIndex(tracks.length - 1);
        } else {
          setTrackIndex(trackIndex - 1);
        }
      }
      
    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
          setTrackIndex(trackIndex + 1);
        } else {
          setTrackIndex(0);
        }
      }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended){
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }
    const onScrubEnd = () => {
        if(!isPlaying){
            setIsPlaying(true);
        }
        startTimer();
    }
    // side effect : audio playing situation change
    useEffect(() => {
        if (isPlaying){
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    },[isPlaying])

    // side effect : change audio when trackIndex change
    useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    
    if (isReady.current) {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
    } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
    }
    },[trackIndex])

    useEffect(() => {
    // Pause and clean up on unmount
    return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
    }
    }, []);

    return(
        <div className="audio-player">
            <div className="track-info">
                <img
                    className="artwork"
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="title">{title}</h2>
                <h3 className="artist">{artist}</h3>
            </div>
            <AudioControls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={setIsPlaying}
            />
            <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="progress"
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                style={{ background: trackStyling }}
            />
            <Backdrop
                trackIndex={trackIndex}
                isPlaying={isPlaying}
            />
        </div>
    );
}
export default AudioPlayer;