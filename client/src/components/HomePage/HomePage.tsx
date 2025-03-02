import NavBar from "../NavBar/NavBar.tsx";
import styles from './styles.module.css'


function HomePage(){
    return(
        <div className={styles.bgHome} >
            <NavBar/>
        </div>
    )

}

export default HomePage;