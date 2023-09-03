import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const HeaderStyled = styled(Link)`
    font-size: 28px;
    letter-spacing: 8px;
    text-align: center;
    color: black;
    text-decoration: none;

    width: 50vw;
    margin: auto;
    padding: 35px 0 33px 0;
    display: flex;
    justify-content: center;
`;

export const TagStyled = styled.div`
    background-color: #f6f8fa;
    font-size: 18px;
    font-weight: 700;
    padding: 16px 21px;
    border-bottom: 1px solid #8c929a;
    border-radius: 16px 16px 0 0;
`;

export const LoadingStyled = styled.section`
    width: 50vw;
    height: 100vh;
    margin: auto;
    background-color: gray;
`;

export const LoadingSpinnerStyled = styled.div`
    height: 50px;

    .loading {
        width: 100%;
        height: 50px;
    }

    .spinner {
        margin: auto;
        width: 32px;
        height: 32px;
        margin-top: 16px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top-color: #888;
        border-right-color: #888;
        border-bottom-color: #888;
        animation: spinner 0.8s ease infinite;
    }

    @keyframes spinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
