import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import style from './OR.module.css';


export default function OR() {
    let props = useLocation();
    let [data, setData] = useState([]);
    let [statetype, setST] = useState("");
    let [title, setTitle] = useState("");
    let [end, setEnd] = useState(false);
    let [go, setGo] = useState("");
    let [re, setRe] = useState("");

    if (data.length === 0){
    const call = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_CONNECT_AD + props.state.data);
            return res.data;
        }
        catch(err){
            console.log(err);
        }   
        }
    const call2 = async() => {
        try{
            const dataList = await call();
            let dataList2 = await dataList.map((data) => data)
            const interval = setInterval(() => {
                const random = Math.floor(Math.random() * dataList.length);
                setData(dataList2[random]);
            }, 60)
            setTimeout(() => {
                clearTimeout(interval);
                setEnd(true);
            }, 1500);
        }
        catch(err){
            console.log(err);
        }
    }
    
    call2();
    }
    if (end){
        if (data.type === "한식"){
            setST("rice");
            setTitle("한 식");
        }
        else if (data.type === "중식"){
            setST("china");
            setTitle("중 식");
        }
        else if (data.type === "일식"){
            setST("japan");
            setTitle("일 식");
        }
        else if (data.type === "분식"){
            setST("bunsik");
            setTitle("분 식");
        }
        else if (data.type === "고기"){
            setST("meat");
            setTitle("고 기");
        }
        else if (data.type === "피자"){
            setST("pizza");
            setTitle("피 자");
        }
        else if (data.type === "치킨"){
            setST("chicken");
            setTitle("치 킨");
        }
        else if (data.type === "햄버거"){
            setST("burger");
            setTitle("햄 버 거");
        }
        else if (data.type === "카페"){
            setST("cafe");
            setTitle("카 페");
        }
        else if (data.type === "술"){
            setST("sul");
            setTitle("술");
        }
        setGo("☞갑시다");
        setRe("☞다시하기");
        setEnd(false);
    }

    return (
        <ReactModal isOpen={true}>
            <div className={style.title}>
                <div className={style.subtitle}>결과는...!</div>
                <div style={{margin: "35px"}}></div>
                <div><header className={style.header}>{ data.name }</header></div>
                <Link to={"/" + statetype + "/" + data.name}
                    style={{ textDecoration: 'none' }}
                    state={{
                        name: data.name,
                        type: statetype,
                        title: title,
                        link: statetype + data.index,
                        number: data.number,
                        address: data.address,
                        lng: data.lng,
                        lat: data.lat,
                        menu: data.menu,
                        img: data.img ? data.img : ["https://i.ibb.co/KFz1MPF/img.png"]
                    }}>
                    <div className={style.go}>{ go }</div>
                </Link>
                <div className={style.go} onClick={() => {setData([])}}>{ re }</div>
            </div>
            <div className={style.foot}>
                <div className={style.foot}><Link to="/"><button className={style.button}>닫기</button></Link></div>
            </div>
        </ReactModal>
    );
 };
