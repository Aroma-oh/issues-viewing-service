import * as S from 'styles/Issue.styled';
import {useNavigate} from 'react-router-dom';
import {PATH} from 'constants/apis';
import React from 'react';
import {IssueItemType} from 'types/Issues';

const IssueItem = ({issue}: IssueItemType) => {
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
        <S.IssueItemStyled onClick={handleMove}>
            <div className='left'>
                <div className='title'>
                    <span>#{number}</span> {title}
                </div>
                <div className='info'>
                    작성자: {userName}, 작성일: {createdAt}
                </div>
            </div>

            <div className='right'>코멘트: {comments}</div>
        </S.IssueItemStyled>
    );
};

export default React.memo(IssueItem);
