import { Back } from './Menufun';
import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Menu.module.css';

let dataList = [{name: "로딩중..."}];


export default function Menu() {
    let [a, b] = useState(dataList);
    const props = useLocation();

    if (a.length === 1){
    const call = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_CONNECT_AD + props.state.type_state); // node.js 서버(4000)에 파라미터 전달 -> store 라우터로 연결
            return res.data;
        }
        catch(err){
            console.log(err);
        }
    }
    const call2 = async() => {
        try{
            const datas = await call();
            let dataList2 = await datas.map((data) => data)
            b(dataList2);
        }
        catch(err){
            console.log(err);
        }
    }

    call2();
    }
    
    return (
        <div>
            {Back()}
            <div className={style.table}>
                <h3 className={style.tableTitle}>{props.state.title}</h3>
            </div>
            <div>
                {a.map((data, index) => {
                    return <div key={"menuBtn" + index}><Link to={"/"+ props.state.type_state + "/" + data.name}
                        state={{
                            name: data.name,
                            type: props.state.type_state,
                            title: props.state.title,
                            link: data.name,
                            number: data.number,
                            address: data.address,
                            lng: data.lng,
                            lat: data.lat,
                            menu: data.menu,
                            img: data.img ? data.img : ["https://i.ibb.co/KFz1MPF/img.png"]
                        }}
                        style={{ textDecoration: 'none' }}><button className={style.name}>{data.name}</button></Link></div>
                })}
            </div>
            <div className={style.hide}>구역</div>
            <div className={style.hide}>구역둘</div>
        </div> 
    );
};