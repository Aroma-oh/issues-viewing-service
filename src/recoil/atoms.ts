import {atom} from 'recoil';
import {IssueStateType} from 'types/issueType';

export const fetchIssueState = atom<IssueStateType>({
    key: 'fetchIssueState',
    default: {
        loading: true,
        fetching: true,
        error: '',
        data: [],
    },
});

export const fetchDetailState = atom<IssueStateType>({
    key: 'fetchDetailState',
    default: {
        loading: true,
        fetching: true,
        error: '',
        data: [],
    },
});

export const pageNumberState = atom({
    key: 'pageNumberState',
    default: 1,
});

export const pageLastNumberState = atom({
    key: 'pageLastNumberState',
    default: 1,
});
