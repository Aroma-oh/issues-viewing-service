import {pageNumberState, pageLastNumberState} from 'recoil/atoms';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useAxios} from 'hooks/useFetchData';
import {IssueStateType} from 'types/issueType';

export const useGetNextPage = (fetchIssueState: RecoilState<IssueStateType>, path: string) => {
    const {fetchData} = useAxios('list', fetchIssueState, path);

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
