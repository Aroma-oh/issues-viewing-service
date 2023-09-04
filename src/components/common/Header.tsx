// import styled, react-router-dom
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// import constant data
import {OWNER, REPO} from 'constants/apis';
import {PATH} from 'constants/apis';

const Header = () => {
    return (
        <HeaderStyle to={PATH}>
            {OWNER} / {REPO}
        </HeaderStyle>
    );
};

export default Header;

const HeaderStyle = styled(Link)`
    font-size: 32px;
    font-weight: 600;

    text-align: center;
    color: black;
    text-decoration: none;
    border-bottom: var(--border-line);
    background-color: white;

    margin-bottom: 24px;
    padding: 21px 0;
    display: flex;
    justify-content: center;

    position: fixed;
    top: 0;
    width: 100%;
`;
