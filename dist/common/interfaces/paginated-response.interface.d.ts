export interface CursorPaginatedResponse<T> {
    data: T[];
    pagination: {
        nextCursor: string | null;
        prevCursor: string | null;
        hasNext: boolean;
        hasPrev: boolean;
        limit: number;
    };
}
export interface CursorPaginationMeta {
    nextCursor: string | null;
    prevCursor: string | null;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
}
