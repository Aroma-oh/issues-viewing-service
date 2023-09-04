// import react, styles
import {memo, useEffect} from 'react';
import styled from 'styled-components';
// import component
import Item from 'components/common/Item';
import Ad from 'components/Ad';
import Tag from 'components/Tag';
import LoadingSpinner from 'components/common/LoadingSpinner';
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

    if (loading) return <>컨테이너 로딩중</>;
    if (error) return <>에러</>;

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

export default memo(ListContainer);

const ContainerStyle = styled.div`
    border: var(--border-line);
    margin: 24px auto;
    border-radius: var(--border-radius);
    overflow: hidden;
`;
