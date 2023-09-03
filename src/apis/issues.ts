import {instance} from './instance';
import {AxiosResponse} from 'axios';
import {PATH} from 'constants/apis';

const FAILED_MESSAGE = '데이터 로드에 실패했습니다.';

export const getIssuesList = async (page: number): Promise<AxiosResponse> => {
    const params = {
        page,
        sort: 'comments',
    };

    try {
        const response = await instance.get(PATH, {params});
        return response;
    } catch (error) {
        alert(FAILED_MESSAGE);
        throw new Error(FAILED_MESSAGE);
    }
};

export const getIssuesDetail = async (id: string | undefined): Promise<AxiosResponse> => {
    try {
        const response = await instance.get(`${PATH}/${id}`);
        return response;
    } catch (error) {
        alert(FAILED_MESSAGE);
        throw new Error(FAILED_MESSAGE);
    }
};
