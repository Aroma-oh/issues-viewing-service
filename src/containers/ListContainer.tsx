// import react, styles
import {useEffect} from 'react';
import styled from 'styled-components';
// import component
import Item from 'components/issue/Item';
import Ad from 'components/issue/Ad';
import Tag from 'components/issue/Tag';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ListSkeleton from 'components/skeleton/ListSkeleton';
import NotFound from 'components/common/NotFound';
// import custom hooks
import {useAxios} from 'hooks/useFetchData';
import {useInfiniteScroll} from 'hooks/useIntersectionObserver';
import {useGetNextPage} from 'hooks/useGetNextPage';
// import recoil, atoms
import {pageLastNumberState, fetchIssueState} from 'recoil/atoms';
import {useSetRecoilState, useRecoilValue} from 'recoil';
// import constant data
import {PATH} from 'constants/apis';

const ListContainer = () => {
    const {fetchData} = useAxios('list', fetchIssueState, PATH);
    const issueState = useRecoilValue(fetchIssueState);
    const {loading, fetching, error, data} = issueState;

    const getNextPage = useGetNextPage(fetchIssueState, PATH);
    const scrollRef = useInfiniteScroll(getNextPage);

    const setLastPageNumber = useSetRecoilState(pageLastNumberState);

    useEffect(() => {
        const params = {page: 1, sort: 'comments'};

        fetchData({params}).then(res => {
            const linkHeader = res?.headers.link;
            const links = linkHeader?.split(',');

            const lastPageLink = links.find((link: string) => link.includes('rel="last"'));
            const lastPage = /page=(\d+)/.exec(lastPageLink);

            if (lastPage) setLastPageNumber(Number(lastPage[1]));
        });
    }, [fetchData, setLastPageNumber]);

    if (loading)
        return (
            <>
                {Array.from({length: 10}).map((_, index) => (
                    <ListSkeleton key={index} />
                ))}
            </>
        );

    if (error) return <NotFound />;

    return (
        <ContainerStyle>
            <Tag>Issues List</Tag>
            {data.map((issue, index) => (
                <div key={index}>
                    <Item issue={issue} />
                    {(index + 1) % 4 === 0 && <Ad />}
                </div>
            ))}
            {fetching && <LoadingSpinner />}
            <div className='scroll-ref' ref={scrollRef} />
        </ContainerStyle>
    );
};

export default ListContainer;

const ContainerStyle = styled.div`
    border: var(--border-line);
    margin: 24px 21px;
    border-radius: var(--border-radius);
    overflow: hidden;
`;
