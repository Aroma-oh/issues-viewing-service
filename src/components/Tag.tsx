import * as S from 'styles/Common.styled';

interface TagProps {
    children: string;
}
const Tag = ({children}: TagProps) => {
    return <S.TagStyled>{children}</S.TagStyled>;
};

export default Tag;
