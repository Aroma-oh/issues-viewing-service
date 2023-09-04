import styled from 'styled-components';

interface NotFoundPropsType {
    error?: string;
}

const NotFound = ({error}: NotFoundPropsType) => {
    return (
        <NotFoundStyle>
            <p>🚧 {error}</p>
            <p className='sub-text'>Please try again later</p>
        </NotFoundStyle>
    );
};

export default NotFound;

const NotFoundStyle = styled.section`
    max-width: 768px;
    margin-top: 150px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
        font-size: 24px;
        line-height: 180%;
        color: var(--gray);
    }
    .sub-text {
        font-weight: 300;
        font-size: 18px;
    }
`;
