// import react, recoil, axios
import {useCallback} from 'react';
import {RecoilState, useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
// import type
import {UseApiType, IssueType} from 'types/api';
import {IssueStateType} from 'types/issueType';
// import api
import {instance} from 'services/instance';

export const useAxios = (
    type: IssueType,
    fetchState: RecoilState<IssueStateType>,
    path: string
) => {
    const setFetchDataState = useSetRecoilState(fetchState);

    const fetchData = useCallback(
        async (params: UseApiType) => {
            try {
                setFetchDataState(prev => ({...prev, fetching: true}));

                const response = await instance.get(path, params);

                if (type === 'detail')
                    setFetchDataState(prev => ({...prev, data: [response.data]}));
                if (type === 'list')
                    setFetchDataState(prev => ({...prev, data: [...prev.data, ...response.data]}));

                return response;
            } catch (e) {
                const error = e as AxiosError;
                setFetchDataState(prev => ({...prev, error: error.message}));
            } finally {
                setFetchDataState(prev => ({...prev, loading: false, fetching: false}));
            }
        },

        [setFetchDataState, path, type]
    );

    return {fetchData};
};
