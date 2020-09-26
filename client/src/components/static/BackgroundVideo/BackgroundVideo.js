import React from 'react'

import Video from './video/winter.mp4'

import './bg-style/background.css'
const BackgroundVideo = () => {
    
    return (
        <div className="container-fluid">
            <video 
                autoPlay="autoplay" 
                loop="loop"
                muted
                className="background"
            >
            <source src={Video} type="video/mp4" />
            Your Browser does not support the video tag.
            </video>
        </div>
    )
}

export default BackgroundVideo