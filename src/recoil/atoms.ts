import {atom} from 'recoil';
import {IssueStateType} from 'types/issues';

export const fetchIssueState = atom<IssueStateType>({
    key: 'fetchIssueState',
    default: {
        loading: true,
        fetching: true,
        error: '',
        data: [],
    },
});

export const fetchIssuesState = atom({
    key: 'fetchIssuesState',
    default: [],
});

export const pageNumberState = atom({
    key: 'pageNumberState',
    default: 1,
});

export const pageLastNumberState = atom({
    key: 'pageLastNumberState',
    default: 1,
});
