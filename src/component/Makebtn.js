import styles from './Makebtn.module.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import Modal from 'react-modal'

import img0 from '../img/osusume.png'
import img0_1 from '../img/q.png'
import img1 from '../img/menu/rice.png'
import img2 from '../img/menu/ramen.png'
import img2_1 from '../img/menu/japan.png'
import img3 from '../img/menu/pizza.png'
import img4 from '../img/menu/chic.png'
import img4_1 from '../img/menu/burger.png'
import img5 from '../img/menu/bunsik.png'
import img6 from '../img/menu/cafe.png'
import img7 from '../img/menu/sul.png'
import img8 from '../img/menu/meat.png'
import Osusume from './menu/Osusume'
import AdfitWebComponent from 'react-adfit-web-component'

export default function Make() {
    Modal.setAppElement('#root');
    const [isOpen, setOpen] = useState(false);

    const setClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <Link to="/rice"
                    state={{
                        type_state: "rice",
                        title: "한 식"
                    }}
                    >
                    <button className={styles.btn}>
                        <img className={styles.img}
                            src={img1} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>한식</h3>
                    </button>
                </Link>
                <Link to="/china"
                    state={{
                        type_state: "china",
                        title: "중 식"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img2} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>중식</h3>
                    </button>
                </Link>
                <Link to="/japan"
                    state={{
                        type_state: "japan",
                        title: "일 식"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img2_1} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>일식</h3>
                    </button>
                </Link>
                <Link to="/bunsik"
                    state={{
                        type_state: "bunsik",
                        title: "분 식"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img5} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>분식</h3>
                    </button>
                </Link>
                <Link to="/meat"
                    state={{
                        type_state: "meat",
                        title: "고 기"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img8} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>고기</h3>
                    </button>
                </Link>
            </div>
            <div>
                <Link to="/pizza"
                    state={{
                        type_state: "pizza",
                        title: "피 자"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img3} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>피자</h3>
                    </button>
                </Link>
                <Link to="/chicken"
                    state={{
                        type_state: "chicken",
                        title: "치 킨"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img4} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>치킨</h3>
                    </button>
                </Link>
                <Link to="/burger"
                    state={{
                        type_state: "burger",
                        title: "햄 버 거"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img4_1} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt2}>햄버거</h3>
                    </button>
                </Link>
                <Link to="/cafe"
                    state={{
                        type_state: "cafe",
                        title: "카 페"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img6} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>카페</h3>
                    </button>
                </Link>
                <Link to="/sul"
                    state={{
                        type_state: "sul",
                        title: "술"
                    }}>
                    <button className={styles.btn}>
                        <img className={styles.img} 
                            src={img7} alt="" 
                            >
                        </img>
                        <h3 className={styles.btntxt}>술</h3>
                    </button>
                </Link>
            </div>
            <div>
                <button className={styles.btn} onClick={() => {setOpen(true)}}>
                    <img className={styles.img} 
                        src={img0} alt="" 
                        >
                    </img>
                    <h4 className={styles.btntxt2}>랜.추</h4>
                </button>
                <Osusume isOpen={isOpen} setClose={setClose}>
                </Osusume>
                <Link to="/q">
                    <button className={styles.btn}>
                            <img className={styles.img} 
                                src={img0_1} alt="" 
                                >
                            </img>
                            <h3 className={styles.btntxt}>정보</h3>
                    </button>
                </Link>
            </div>
            <AdfitWebComponent
             adUnit="DAN-wV1OsTea6rTds5qN"
            />
        </div>
    )
};
