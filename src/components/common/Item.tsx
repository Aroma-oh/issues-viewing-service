import {memo} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {MdOutlineModeComment} from 'react-icons/md';

import {PATH} from 'constants/apis';
import {IssueType} from 'types/issues';

const Item = ({issue, list}: {issue: IssueType; list?: boolean}) => {
    const {
        number,
        title,
        user: {login: userName},
        created_at: createdAt,
        comments,
    } = issue;

    const navigation = useNavigate();

    const handleMove = () => {
        navigation(`${PATH}/${number}`);
    };

    return (
        <ItemStyle onClick={() => !list && handleMove()} className={list ? '' : 'hover'}>
            <div className='left'>
                <div className='title'>
                    <span>#{number}</span> {title}
                </div>
                <div className='info'>
                    작성자: {userName}, 작성일: {createdAt}
                </div>
            </div>

            <div className='right'>
                <MdOutlineModeComment style={{marginBottom: '5px', fontSize: '16px'}} /> {comments}
            </div>
        </ItemStyle>
    );
};

export default memo(Item);

const ItemStyle = styled.div`
    padding: 26px 21px;
    display: flex;
    gap: 20px;
    border-bottom: var(--border-line);
    width: 100%;

    &:hover.hover {
        background-color: #f6f8fa;
        cursor: pointer;
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
        font-weight: 400;
        color: var(--gray);

        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
    }

    .title {
        font-size: 17px;
        font-weight: 500;
        line-height: 140%;
        span {
            margin-right: 4px;
            font-weight: 300;
        }
    }
    .info {
        font-size: 14px;
        color: var(--gray);
    }
`;
