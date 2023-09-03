import * as S from 'styles/Common.styled';

const LoadingSpinner = () => {
    return (
        <S.LoadingSpinnerStyled className='loading'>
            <div className='spinner' />
        </S.LoadingSpinnerStyled>
    );
};

export default LoadingSpinner;
