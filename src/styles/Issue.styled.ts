import styled from 'styled-components';

export const ListContainerStyled = styled.div`
    width: 50vw;
    border: solid 1px #8c929a;
    margin: auto;
    border-radius: 16px;
    cursor: pointer;
    overflow: hidden;
`;

export const IssueItemStyled = styled.div`
    width: 50vw;
    padding: 26px 21px;
    display: flex;
    gap: 20px;
    border-bottom: solid 1px #8c929a;
    &:hover {
        background-color: #f6f8fa;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 80%;
    }
    .right {
        width: 20%;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .title {
        font-size: 17px;
        font-weight: 700;
        line-height: 140%;
        span {
            margin-right: 4px;
            font-weight: 500;
        }
    }
    .info {
        font-size: 14px;
        color: gray;
    }
`;

export const ListAdStyled = styled.div`
    width: 50vw;
    border-bottom: solid 1px #8c929a;
    display: flex;
    justify-content: center;
    img {
        width: 25vw;
        padding: 26px 0;
    }
`;

export const IssueBodyStyled = styled.div`
    background-color: antiquewhite;
`;
