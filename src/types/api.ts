export interface UseApiType {
    params: {
        page?: number;
        issue?: number;
        sort?: string;
        state?: string;
    };
}

export type IssueType = 'list' | 'detail';
