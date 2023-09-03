import {atom} from 'recoil';

export const fetchIssueState = atom({
    key: 'fetchIssueState',
    default: {
        data: [],
        loading: false,
        error: false,
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
