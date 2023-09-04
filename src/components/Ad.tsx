import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Ad = () => {
    return (
        <AdStyle>
            <Link to='https://www.wanted.co.kr/' target='_blank'>
                <img
                    src='https://cdn.discordapp.com/attachments/1143474691118485558/1146132601518686371/ad_image.png'
                    alt='원티드 광고 이미지'
                ></img>
            </Link>
        </AdStyle>
    );
};

export default Ad;

const AdStyle = styled.div`
    border-bottom: var(--border-line);
    display: flex;
    justify-content: center;

    img {
        width: 21vw;
        padding: 16px 0;
    }
`;
