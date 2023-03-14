import titleImg from '../img/title.png';
import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.head}>
            <img
                src={titleImg}
                alt=""
                className={styles.img}></img>
        </div>
    );
}