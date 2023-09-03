// import react, styles
import {memo, useEffect} from 'react';
import * as S from 'styles/Issue.styled';
// import component
import IssueItem from 'components/IssueItem';
import ListAd from 'components/ListAd';
import Tag from 'components/Tag';
import LoadingSpinner from 'components/LoadingSpinner';
// import custom hooks
import {useAxios} from 'hooks/useFetchData';
import {useInfiniteScroll} from 'hooks/useIntersectionObserver';
import {useGetNextPage} from 'hooks/useNextPage';
// import recoil, atoms
import {pageLastNumberState} from 'recoil/atoms';
import {useSetRecoilState} from 'recoil';

const ListContainer = () => {
    const {fetchDataState, fetchData} = useAxios();
    const {loading, fetching, error, data} = fetchDataState;

    const setLastPageNumber = useSetRecoilState(pageLastNumberState);

    const params = {pageNumber: 1, sort: 'comments'};

    useEffect(() => {
        fetchData({params}).then(res => {
            const linkHeader = res?.headers.link;
            const links = linkHeader.split(',');

            const lastPageLink = links.find((link: string) => link.includes('rel="last"'));
            const lastPage = /page=(\d+)/.exec(lastPageLink);

            if (lastPage) setLastPageNumber(Number(lastPage[1]));
        });
    }, []); // 의존성 배열 수정 필요

    const scrollRef = useInfiniteScroll(useGetNextPage);

    if (loading) return <>컨테이너 로딩중</>;
    if (error) return <>에러</>;

    return (
        <S.ListContainerStyled>
            <Tag>Issues List</Tag>
            {data.map((issue, index) => (
                <div key={index}>
                    <IssueItem issue={issue} />
                    {(index + 1) % 4 === 0 && <ListAd />}
                </div>
            ))}
            {fetching && <LoadingSpinner />}
            <div className='scroll-ref' ref={scrollRef} />
        </S.ListContainerStyled>
    );
};

export default memo(ListContainer);
