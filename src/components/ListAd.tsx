import * as S from 'styles/Issue.styled';
import {Link} from 'react-router-dom';

const ListAd = () => {
    return (
        <S.ListAdStyled>
            <Link to='https://www.wanted.co.kr/' target='_blank'>
                <img
                    src='https://cdn.discordapp.com/attachments/1143474691118485558/1146132601518686371/ad_image.png'
                    alt='원티드 광고 이미지'
                ></img>
            </Link>
        </S.ListAdStyled>
    );
};

export default ListAd;
