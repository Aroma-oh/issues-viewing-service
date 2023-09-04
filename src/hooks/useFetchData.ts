import {useCallback} from 'react';
import {instance} from 'apis/instance';
import {PATH} from 'constants/apis';
import {AxiosError} from 'axios';
import {UseApiType} from 'types/api';
import {fetchIssueState} from 'recoil/atoms';
import {useRecoilState} from 'recoil';

export const useAxios = () => {
    const [fetchDataState, setFetchDataState] = useRecoilState(fetchIssueState);

    const fetchData = useCallback(
        async (params: UseApiType) => {
            try {
                setFetchDataState(prev => ({...prev, fetching: true}));

                const response = await instance.get(PATH, params);
                setFetchDataState(prev => ({...prev, data: [...prev.data, ...response.data]}));

                return response;
            } catch (e) {
                const error = e as AxiosError;
                setFetchDataState(prev => ({...prev, error: error.message}));
            } finally {
                setFetchDataState(prev => ({...prev, loading: false, fetching: false}));
            }
        },
        [setFetchDataState]
    );

    return {fetchData, fetchDataState};
};
