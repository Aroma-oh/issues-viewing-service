import {pageNumberState, pageLastNumberState} from 'recoil/atoms';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useAxios} from 'hooks/useFetchData';
import {IssueStateType} from 'types/issues';

export const useGetNextPage = (fetchIssueState: RecoilState<IssueStateType>) => {
    const {fetchData} = useAxios(fetchIssueState);

    const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);

    const issueState = useRecoilValue(fetchIssueState);
    const lastPageNumber = useRecoilValue(pageLastNumberState);

    const getNextPage = async () => {
        if (pageNumber === lastPageNumber || issueState.fetching) return;

        const params = {page: pageNumber + 1, sort: 'comments'};

        await fetchData({params});

        setPageNumber(prev => prev + 1);
    };

    return getNextPage;
};
