import React from 'react';
import { Card } from 'antd';
import styles from './styles.module.css';
import video from '../../assets/spb video mp4.mp4';

function Video()  {
    return (
        <Card className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
                <video src={video} autoPlay={true} muted={true} loop={true} className={styles.videoPlayer}>
                </video>
            </div>
        </Card>
    );
};

export default Video;