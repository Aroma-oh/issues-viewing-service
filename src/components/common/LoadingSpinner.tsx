import styled from 'styled-components';

const LoadingSpinner = ({props}: {props: string}) => {
    return (
        <LoadingSpinnerStyle className='loading' display={props}>
            <div className='spinner' />
        </LoadingSpinnerStyle>
    );
};

export default LoadingSpinner;

interface StypePropsType {
    display: string;
}
const LoadingSpinnerStyle = styled.div<StypePropsType>`
    display: ${({display}) => (display === 'hide' ? `none` : null)};
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
