import { Back } from './Menufun';

export default function Q() {
    return (
        <div>
            <h1 onClick={() => window.open('https://www.flaticon.com/kr/', '_blank')}>아이콘 출처 : Flaticon</h1>
            <h3>카페 아이콘 : Smashicons</h3>
            <h3>중식 아이콘 : Konkapp</h3>
            <h3>그 외 : Freepik</h3>
            <a href='mailto:qp1qp1qp1qp@naver.com'>문의 및 피드백: qp1qp1qp1qp@naver.com</a>
            {Back()}
        </div>
    );
}