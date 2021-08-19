import React, { useEffect } from 'react';
import "./index.less"
const Backdrop = ({
    activeColor,
    trackIndex,
    isPlaying,
}) => {
    return (
        <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />
    );
}
export default Backdrop;