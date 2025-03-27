import NavBar from "../NavBar/NavBar.tsx";
import style from './styles.module.css'
import {Content} from "antd/es/layout/layout";
import {Layout, Space} from "antd";
import img from '../../assets/hp_spb_1.jpg'
import Excursions from "../Excursions/Excursions.tsx";
import Gallery from "./Gallery/Gallery.tsx";
import About from "./About/About.tsx";
import Footer from "./Footer/Footer.tsx";


function HomePage() {
    return (
        <Layout className={style.layoutHome}>
            <Space>
                <NavBar/>
            </Space>
            <Content>
                <Space className={style.imageContainer}>
                    <img
                        src={"https://avatars.mds.yandex.net/get-altay/7456447/2a00000183f0c476c3d99418bb880d5da3a3/XXXL"}
                        alt="Dynamic"
                        className={style.dynamicImage}
                    />

                    <Space className={style.titleContainer}>
                        <h1 className={style.title}>ПУТЕШЕСТВУЙ ВМЕСТЕ С PERO TRAVEL</h1>
                    </Space>
                </Space>
                <Space>

                </Space>

            </Content>
            <Excursions/>
            <Gallery/>
            <About/>
            <Footer/>

        </Layout>

    )

}

export default HomePage;