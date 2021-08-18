import React from 'react';
import AudioPlayer from './Components/AudioPlayer';
const View = () => {
    interface track {
        title: string,
        artist: string,
        audioSrc: string,
        image: string,
        color: string,        
      };
      const t : track = {
        title :"1213",
        artist :"1213",
        audioSrc :"test.mp3",
        image : "11.jpg",
        color : "1213"
      } 
      const t2 : track = {
        title :"22",
        artist :"33",
        audioSrc :"222.mp3",
        image : "11.jpg",
        color : "2222222"
      } 
      const list: any[] = [t,t2];
    return(
        <div>
            <AudioPlayer tracks={list}/>
        </div>
    )
}
export default View;