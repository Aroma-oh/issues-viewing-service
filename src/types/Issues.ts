export interface IssueType {
    number: number;
    title: string;
    user: {login: string};
    created_at: string;
    comments: string;
    body?: string;
}

export interface IssueItemType {
    issue: IssueType;
}
