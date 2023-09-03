import * as S from 'styles/Issue.styled';

interface MyComponentProps {
    body: string | undefined;
}

const IssueBody = ({body}: MyComponentProps) => {
    if (body === undefined) {
        return null; // 에러처리
    }

    return <S.IssueBodyStyled>{body}</S.IssueBodyStyled>;
};

export default IssueBody;
