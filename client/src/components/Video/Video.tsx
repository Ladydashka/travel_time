import React from 'react';
import { Card } from 'antd';
import styles from './stylesVideo.module.css';
import  video from '../../assets/video.mp4'
import NavBar from "../NavBar/NavBar.tsx";



function Video()  {


    return(
        <Card className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
                <video src={video} autoPlay={true} muted={true} loop={true} className={styles.videoPlayer}>
                </video>
            </div>
            <NavBar/>
        </Card>
    )
};

export default Video;