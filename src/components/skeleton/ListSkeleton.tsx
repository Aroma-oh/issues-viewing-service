import styled from 'styled-components';

const ListSkeleton = () => {
    return (
        <SkeletonStyle>
            <div />
            <div />
        </SkeletonStyle>
    );
};

export default ListSkeleton;

const SkeletonStyle = styled.div``;
