import styled from 'styled-components';
import MarkdownPreview from '@uiw/react-markdown-preview';
import NotFound from 'components/common/NotFound';

interface BodyPropsType {
    body: string | undefined;
}

const Body = ({body}: BodyPropsType) => {
    if (body === undefined) {
        return <NotFound />;
    }

    return (
        <BodyStyle>
            <MarkdownPreview source={body} />
        </BodyStyle>
    );
};

export default Body;

export const BodyStyle = styled.div`
    padding: 26px 21px;
    video {
        display: none;
    }
`;
