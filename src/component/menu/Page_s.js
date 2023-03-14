import { Back } from './Menufun';
import { useLocation } from 'react-router-dom';
import style from './Page.module.css';
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from 'react-naver-maps';
import { useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import swal from 'sweetalert';
import bcryptjs from 'bcryptjs';

export default function Page() {
    let props = useLocation();
    let name = props.state.name
    const la = props.state.lat;
    const ln = props.state.lng;
    const link = props.state.link;
    const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
    const [cmt, setCmt] = useState([]);
    let [update, setUpdate] = useState(false);

    let [imgIdx, setimgIdx] = useState(0);
    let [showImg, setshowImg] = useState(props.state.img[imgIdx]);


    const [info, setInfo] = useState({
        nick: "",
        password: "",
        comment: ""
      });

    const onChangeInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const isMenu = () => {
        if(props.state.menu !== undefined){
            return (
                <div>
                    <div className={style.menutitle}>{"<대표 메뉴>"}</div>
                    {props.state.menu.map((data, index) => {
                        return (
                            <div className={style.menulist} key={"menu" + index}>{data}</div>
                        )
                    })}
                </div>
            )
        }
    }

    const sendData = () => {
        if (info.nick === ""){
            swal("한밭대 오늘 뭐먹지?", "닉네임을 입력해주세요.", "warning")
            return
        }
        else if (info.password === ""){
            swal("한밭대 오늘 뭐먹지?", "비밀번호를 입력해주세요.", "warning")
            return
        }
        else if (info.comment === ""){
            swal("한밭대 오늘 뭐먹지?", "내용을 입력해주세요.", "warning")
            return
        }

        const data = {
            nick: info.nick,
            password: info.password,
            comment: info.comment,
            link: link
        }
        axios
            .post(process.env.REACT_APP_CONNECT_AD + "comment", data)
            .then(result => {
                swal("한밭대 오늘 뭐먹지?", result.data.message, "success")
                    .then(() => {
                        setUpdate(false);
                    })
                setInfo({
                    nick: "",
                    password: "",
                    comment: ""
                });
                setCmt([]);
            })

    }
    const ShowComment = async(link) => {
        try {
            if (update === false){
                const res = await axios.post(process.env.REACT_APP_CONNECT_AD + "comment/" + link);
                setCmt(res.data);
                setUpdate(true);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    ShowComment(link);

    const menuState = {
        type_state: props.state.type,
        title: props.state.title
    }

    const updateComment = (data) => {
        let result;
        swal({
            title: "수정",
            text: '비밀번호를 입력해주세요.',
            content: {
                element: "input",
                attributes: {
                    type: "password"
                }
            },
            button: {
              text: "확인",
            },
          })
          .then((pwd) => {
            if (pwd){
                result = bcryptjs.compareSync(pwd, data.password)
                if (result){ 
                    swal({
                        title: "확인되었습니다.",
                        text: '수정할 내용을 입력해주세요.',
                        icon: "success",
                        content: {
                            element: "input",
                            attributes: {
                                value: data.comment
                            }
                        },
                        button: {
                            text: "확인",
                        },
                    }).then((newTxt) => {
                            if (newTxt){
                                const dataset = {
                                    id: data._id,
                                    text: newTxt
                                }
                                axios
                                    .put(process.env.REACT_APP_CONNECT_AD + "comment/update", dataset)
                                    .then((result) => {
                                        swal("한밭대 오늘 뭐먹지?", result.data.message, "success")
                                            .then(setUpdate(false))
                                    })
                            }
                        })
                }
                else {
                    swal("에러", "비밀번호가 맞지 않습니다.", "error");
                }
            }
          })
    }

    const deleteComment = (data) => {
        swal({
            title: "삭제",
            text: '비밀번호를 입력해주세요.',
            icon: 'warning',
            content: {
                element: "input",
                attributes: {
                    type: "password"
                }
            },
            button: {
              text: "확인",
            },
        }).then((pwd) => {
            if (pwd) {
                const result = bcryptjs.compareSync(pwd, data.password)
                if (result) {
                    axios
                        .delete(process.env.REACT_APP_CONNECT_AD + "comment/delete?id=" + data._id)
                        .then((result) => {
                            swal("한밭대 오늘 뭐먹지?", result.data.message, "success")
                                .then(setUpdate(false))
                        })
                }
                else {
                    swal("에러", "비밀번호가 맞지 않습니다.", "error");
                }
            }
        })
    }

    const moveImg = (type) => {
        if (type === -1){
            if (imgIdx === 0){
                return
            }
            setimgIdx(imgIdx -= 1)
        }
        else {
            if (imgIdx === (props.state.img).length - 1){
                return
            }
            setimgIdx(imgIdx += 1)
        }
        setshowImg(props.state.img[imgIdx])
    }


    if (isTabletOrMobileDevice){
        name = name.replace(" ", "\n");
        return (
            <form className={style.container}>
                {Back(props.state.type, menuState)}
                <h3>{ name }</h3>
                <span>
                    <div>
                        <div className={style.imgcon}>
                            <img src={showImg} alt="" border="0" className={style.img}></img>
                        </div>
                    </div>
                    <div>
                        {/* <button className={style.imgbtn} onClick={() => moveImg(-1)}>☜ 이전</button>
                        <button className={style.imgbtn} onClick={() => moveImg(1)}>다음 ☞</button> */}
                    </div>
                    <RenderAfterNavermapsLoaded
                        ncpClientId={process.env.REACT_APP_NAVER_MAP}
                    >
                        <NaverMap
                        mapDivId="map"
                        style={{
                            width: "100%",
                            height: "300px",
                            marginTop: "15px"
                        }}
                        defaultCenter={{ lat: la, lng: ln }}
                        defaultZoom={19}
                        scrollWheel={false}
                        >
                            <Marker
                                position={{lat:la, lng:ln}}
                            />
                            <h3>test</h3>
                        </NaverMap>
                        
                    </RenderAfterNavermapsLoaded>
                    <div className={style.storeinfotxt}>{props.state.number}</div>
                    <div className={style.storeinfotxt}>{props.state.address}</div>
                    {isMenu()}
                </span>
                <div className={style.mainCon}> {/*컴포넌트 전체 구역 */}
                    <div style={{float: "left"}}> {/*닉네임 비밀번호 구역 */}
                        <div> 
                            <input size="8" maxLength="16" name="nick" className={style.idpass} placeholder="닉네임" value={info.nick} onChange={onChangeInfo}></input>
                        </div>
                        <div>
                            <input size="8" maxLength="30" name="password" className={style.idpass} placeholder="비밀번호" type="password" value={info.password} onChange={onChangeInfo}></input>
                        </div>
                    </div>
                    <div className={style.textdiv}> {/*텍스트 입력, 등록버튼 구역 */}
                        <div>
                            <textarea className={style.textarea} name="comment" rows="5" cols="20" value={info.comment} placeholder="욕설 및 비방 코멘트는 무통보 삭제처리될 수 있습니다." onChange={onChangeInfo}></textarea>
                        </div>
                        <div>
                            <button className={style.uploadBtn} onClick={() => {sendData()}}>등록</button>
                        </div>
                    </div>
                    <div className={style.hide}>구역</div>
                </div>
                <div className={style.cmtarea}> {/* 댓글 표시 구역 */}
                    <div className={style.cmttitle}>최근 코멘트</div>
                        {cmt.map((data) => {
                            return (
                                <div className={style.printCmt} key={data._id}>
                                    <form style={{float: "right"}}>
                                        <button className={style.deleteCmt} onClick={() => updateComment(data)}>수정</button>
                                        <button className={style.deleteCmt} onClick={() => deleteComment(data)}>삭제</button>
                                    </form>
                                    <div className={style.printCmtid}>
                                        <p>{data.nick}</p>
                                    </div>
                                    <p className={style.printCmtin}>{data.comment}</p>
                                </div>                           
                        )})}
                </div>
                <div className={style.hide}>구역</div>
                <div className={style.hide}>구역둘</div>
                <div className={style.hide}>구역셋</div>
            </form> 
        );
    }

    return (
        <div className={style.container}>
            {Back(props.state.type, menuState)}
            <h3>{ name }</h3>
            <span>
                <div>
                    <div className={style.imgcon}>
                        <img src={showImg} alt="" border="0" className={style.img}></img>
                    </div>
                </div>
                <div>
                    <button className={style.imgbtn} onClick={() => moveImg(-1)}>☜ 이전</button>
                    <button className={style.imgbtn} onClick={() => moveImg(1)}>다음 ☞</button>
                </div>
                <RenderAfterNavermapsLoaded
                    ncpClientId={process.env.REACT_APP_NAVER_MAP}
                >
                    <NaverMap
                    mapDivId="map"
                    style={{
                        width: "600px",
                        height: "300px",
                        left: "50%",
                        marginLeft: "-300px",
                        marginTop: "15px"
                    }}
                    defaultCenter={{ lat: la, lng: ln }}
                    defaultZoom={19}
                    scrollWheel={false}
                    >
                        <Marker
                            position={{lat:la, lng:ln}}
                        />
                        <h3>test</h3>
                    </NaverMap>
                    
                </RenderAfterNavermapsLoaded>
                <div className={style.storeinfotxt}>{props.state.number}</div>
                <div className={style.storeinfotxt}>{props.state.address}</div>
                {isMenu()}
            </span>
            <div className={style.mainCon}> {/*컴포넌트 전체 구역 */}
                <div style={{float: "left"}}> {/*닉네임 비밀번호 구역 */}
                    <div> 
                        <input size="10" maxLength="16" name="nick" className={style.idpass} placeholder="닉네임" value={info.nick} onChange={onChangeInfo}></input>
                    </div>
                    <form>
                        <input size="10" maxLength="30" name="password" className={style.idpass} placeholder="비밀번호" type="password" autoComplete="off" value={info.password} onChange={onChangeInfo}></input>
                    </form>
                </div>
                <div className={style.textdiv}> {/*텍스트 입력, 등록버튼 구역 */}
                    <div>
                        <textarea className={style.textarea} name="comment" rows="5" cols="60" value={info.comment} placeholder="욕설 및 비방 코멘트는 무통보 삭제처리될 수 있습니다." onChange={onChangeInfo}></textarea>
                    </div>
                    <div>
                        <button className={style.uploadBtn} onClick={() => {sendData()}}>등록</button>
                    </div>
                </div>
                <div className={style.hide}>구역</div>
            </div>

            <div className={style.cmtarea}> {/* 댓글 표시 구역 */}
                <div className={style.cmttitle}>최근 코멘트</div>
                    {cmt.map((data) => {
                        return (
                            <div className={style.printCmt} key={data._id}>
                                <form style={{float: "right", display:"table-cell"}}>
                                    <p className={style.deleteCmt} onClick={() => {updateComment(data)}}>수정</p>
                                    <p className={style.deleteCmt} onClick={() => {deleteComment(data)}}>삭제</p>
                                </form>
                                <div className={style.printCmtid}>
                                    <p>{data.nick}</p>
                                </div>
                                <div style={{width:"fit-content"}}>
                                    <p className={style.printCmtin}>{data.comment}</p>
                                </div>
                            </div>                           
                    )})}
            </div>

            <div className={style.hide}>구역</div>
            <div className={style.hide}>구역둘</div>
            <div className={style.hide}>구역셋</div>
        </div> 
    );
};