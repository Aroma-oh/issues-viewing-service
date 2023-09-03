import * as S from 'styles/Common.styled';
import {OWNER, REPO} from 'constants/apis';
import {PATH} from 'constants/apis';

const Header = () => {
    return (
        <S.HeaderStyled to={PATH}>
            {OWNER} / {REPO}
        </S.HeaderStyled>
    );
};

export default Header;
