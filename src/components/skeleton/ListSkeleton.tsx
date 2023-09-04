import styled from 'styled-components';

const ListSkeleton = () => {
    return (
        <SkeletonStyle>
            <div className='left'>
                <div className='title' />
                <div className='info'></div>
            </div>
            <div className='right' />
        </SkeletonStyle>
    );
};

export default ListSkeleton;

const SkeletonStyle = styled.div`
    width: 100%;
    padding: 26px 21px;
    display: flex;
    gap: 20px;
    border-bottom: var(--border-line);
    animation: shine 1s ease-in-out infinite;

    .left {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 80%;
    }
    .right {
        width: 8%;
        margin: auto 0 auto auto;
    }

    .title,
    .info,
    .right {
        height: 17px;
        background-color: var(--bg-gray);
        border-radius: var(--border-radius);
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
