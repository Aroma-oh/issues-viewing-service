import {pageNumberState, pageLastNumberState} from 'recoil/atoms';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAxios} from 'hooks/useFetchData';

export const useGetNextPage = async () => {
    const {fetchData} = useAxios();

    const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);
    const lastPageNumber = useRecoilValue(pageLastNumberState);

    if (pageNumber === lastPageNumber) return;

    const params = {pageNumber: pageNumber + 1, sort: 'comments'};

    await fetchData({params});

    setPageNumber(prev => prev + 1);
    console.info(pageNumber);
};
