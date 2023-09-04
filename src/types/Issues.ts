export interface IssueType {
    number: number;
    title: string;
    user: {login: string};
    created_at: string;
    comments: string;
    body?: string;
}

export interface IssueStateType {
    loading: boolean;
    fetching: boolean;
    error: string;
    data: IssueType[] | [];
}

export interface IssueItemType {
    issue: IssueType;
}
