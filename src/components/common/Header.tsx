// import styled, react-router-dom
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
// import constant data
import {OWNER, REPO} from 'constants/apis';
import {PATH} from 'constants/apis';

const Header = () => {
    const navigate = useNavigate();

    const moveToList = () => {
        window.scrollTo(0, 0);
        navigate(PATH);
    };

    return (
        <HeaderStyle onClick={moveToList}>
            {OWNER} / {REPO}
        </HeaderStyle>
    );
};

export default Header;

const HeaderStyle = styled.header`
    font-size: 32px;
    font-weight: 600;

    text-align: center;
    border-bottom: var(--border-line);
    background-color: white;
    cursor: pointer;

    margin-bottom: 24px;
    padding: 26px 0 21px 0;
    display: flex;
    justify-content: center;

    position: fixed;
    top: 0;
    width: 100%;
`;
