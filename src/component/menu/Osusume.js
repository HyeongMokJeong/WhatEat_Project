import style from './Osusume.module.css'
import ReactModal from 'react-modal'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const List = [ {name: "밥", type: "bob"}, {name: "면", type: "men"}, {name: "분식", type: "bunsik"}, {name: "고기", type: "meat"}, {name: "햄버거", type: "burger"}, {name: "치킨", type: "chicken"}, {name: "피자", type: "pizza"}, {name: "카페", type: "cafe"}, {name: "술집", type: "sul"}]

const Osusume = ({ isOpen, setClose }) => {
    let [state, setState] = useState("0");

    const radioEve = e => {
        setState(e.target.value);
    }

    return (
        <ReactModal isOpen={isOpen} className={style.modal}>
            <div className={style.title}>
                <header>
                    견 적 서
                </header>
                <div className={style.subtitle}>종 류</div>
                <span className={style.radiodiv}>
                    <div>
                        <input type='radio' id="radio1" value="0" checked={state === "0"} onChange={radioEve} className={style.radio}/>
                        <label htmlFor="radio1">{List[0].name}</label>
                        <input type='radio' id="radio2" value="1" checked={state === "1"} onChange={radioEve} className={style.radio}/>
                        <label htmlFor="radio2">{List[1].name}</label>
                        <input type='radio' id="radio3" value="2" checked={state === "2"} onChange={radioEve} className={style.radio}/>
                        <label htmlFor="radio3">{List[2].name}</label>
                    </div>
                    <input type='radio' id="radio4" value="3" checked={state === "3"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio4">{List[3].name}</label>
                    <input type='radio' id="radio5" value="4" checked={state === "4"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio5">{List[4].name}</label>
                    <input type='radio' id="radio6" value="5" checked={state === "5"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio6">{List[5].name}</label>
                    <input type='radio' id="radio7" value="6" checked={state === "6"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio7">{List[6].name}</label>
                </span>
                <div className={style.subtitle}>옵 션</div>
                <span className={style.radiodiv2}>
                    <input type='radio' id="radio8" value="7" checked={state === "7"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio8">{List[7].name}</label>
                    <input type='radio' id="radio9" value="8" checked={state === "8"} onChange={radioEve} className={style.radio}/>
                    <label htmlFor="radio9">{List[8].name}</label>
                </span>
                <div>
                    <span className={style.close}>
                        <Link to='/osusume'
                        state={{
                            data: List[state].type
                        }}>
                            <button className={style.button} onClick={setClose}>제출</button>
                        </Link>
                        <button onClick={setClose} className={style.button}>닫기</button>
                    </span>
                </div>
            </div>
        </ReactModal>
    );
};

export default Osusume;