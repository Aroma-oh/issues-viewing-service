import {useCallback, useState} from 'react';
import {instance} from 'apis/instance';
import {PATH} from 'constants/apis';
import {AxiosError} from 'axios';
import {UseApiType} from 'types/api';

export const useAxios = () => {
    const [fetchDataState, setFetchDataState] = useState({
        loading: true,
        fetching: true,
        error: '',
        data: [],
    });

    const fetchData = useCallback(async (params: UseApiType) => {
        try {
            setFetchDataState(prev => ({...prev, fetching: true}));
            const response = await instance.get(PATH, params);
            setFetchDataState(prev => ({...prev, data: response.data}));
            return response;
        } catch (e) {
            const error = e as AxiosError;
            setFetchDataState(prev => ({...prev, error: error.message}));
        } finally {
            setFetchDataState(prev => ({...prev, loading: false, fetching: false}));
        }
    }, []);

    return {fetchData, fetchDataState};
};
