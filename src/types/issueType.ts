export interface IssueType {
    number: number;
    title: string;
    user: {login: string; avatar_url?: string};
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
