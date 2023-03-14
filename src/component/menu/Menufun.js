import {Link} from 'react-router-dom';
import styles from './Menu.module.css';

export function Back(type, menuState) {
    let data;
    if (type === undefined)
        data = "/";
    else
        data = "/" + type;
    
    if (menuState){
        return (
            <div>
                <Link to={data}
                    state={{
                        type_state: menuState.type_state,
                        title: menuState.title
                    }}>
                    <button className={styles.backBtn}>
                        돌아가기
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <div>
            <Link to={data}>
                <button className={styles.backBtn}>
                    돌아가기
                </button>
            </Link>
        </div>
    );
}