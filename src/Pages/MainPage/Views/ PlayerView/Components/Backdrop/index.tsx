import React, { useEffect } from 'react';
import "./index.less"
const Backdrop = ({
    trackIndex,
    isPlaying,
}) => {
    return (
        <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />
    );
}
export default Backdrop;