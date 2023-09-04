import styled from 'styled-components';
import ListSkeleton from './ListSkeleton';

const DetailSkeleton = () => {
    return (
        <SkeletonStyle>
            <div className='info'>
                <div className='img' />
                <ListSkeleton />
            </div>
            <div className='body' />
        </SkeletonStyle>
    );
};

export default DetailSkeleton;

const SkeletonStyle = styled.div`
    margin: 24px 21px;
    animation: shine 1s ease-in-out infinite;

    display: flex;
    justify-content: center;
    flex-direction: column;

    .info {
        display: flex;
        align-items: center;
        padding: 0 21px;
        gap: 10px;
    }
    .img {
        border-radius: 50%;
        width: 85px;
        height: 75px;
        display: inline-block;
        background-color: var(--bg-gray);
    }
    .body {
        margin-top: 28px;
        padding: 26px 21px;
        width: 100%;
        height: 500px;
        background-color: var(--bg-gray);
    }

    @keyframes shine {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
        }
    }
`;
