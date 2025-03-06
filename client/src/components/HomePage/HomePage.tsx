import NavBar from "../NavBar/NavBar.tsx";
import styles from './styles.module.css'
import {Content} from "antd/es/layout/layout";
import {Layout, Space} from "antd";
import img from '../../assets/hp_spb_1.jpg'



function HomePage(){
    return(
        <Layout className={styles.layoutHome}>
            <Space >
                <NavBar />
            </Space>
            <Content>
                <Space className={styles.imageContainer}>
                    <img
                        src={img}
                        alt="Dynamic"
                        className={styles.dynamicImage}
                    />

                    <Space className={styles.titleContainer}>
                        <h1 className={styles.title}>ПУТЕШЕСТВУЙ ВМЕСТЕ С PERO TRAVEL</h1>
                    </Space>
                </Space>
                <Space>

                </Space>

            </Content>
        </Layout>

    )

}

export default HomePage;