// import react, recoil, axios
import {useCallback} from 'react';
import {RecoilState, useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
// import type
import {UseApiType} from 'types/api';
import {IssueStateType} from 'types/issues';
// import constant data, api
import {PATH} from 'constants/apis';
import {instance} from 'apis/instance';

export const useAxios = (fetchIssueState: RecoilState<IssueStateType>) => {
    const setFetchDataState = useSetRecoilState(fetchIssueState);

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

    return {fetchData};
};
