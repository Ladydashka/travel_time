import React from 'react';
import ReactPlayer from 'react-player';
import NavBar from "../NavBar/NavBar.tsx";
import styles from './styles.module.css';

const VideoPlayer = () => {
    const videoUrl = 'https://vimeo.com/1061588075';

    return (
        <div className={styles.videoPlayerContainer}>
            <ReactPlayer
                url={videoUrl}
                className={styles.reactPlayer}
                controls={false}
                playing={true}
                volume={0}
                loop={true}
                pip={false}
                width = '100%'
                height = '100%'


            />
            <NavBar />
        </div>
    );
};

export default VideoPlayer;