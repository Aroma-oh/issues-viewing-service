import styled from 'styled-components';

interface TagProps {
    children: string;
}

const Tag = ({children}: TagProps) => {
    return <TagStyle>{children}</TagStyle>;
};

export default Tag;

const TagStyle = styled.div`
    background-color: #f6f8fa;
    font-size: 18px;
    padding: 16px 21px;
    border-bottom: var(--border-line);
    overflow: hidden;
`;
