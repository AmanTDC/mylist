import { CursorPaginatedResponse } from '../interfaces/paginated-response.interface';
export declare class CursorPaginationHelper {
    static createCursorPaginatedResponse<T extends {
        _id?: any;
        id?: any;
    }>(data: T[], limit: number, requestedCursor?: string): CursorPaginatedResponse<T>;
    static getCursorFromItem(item: any): string;
    static buildCursorQuery(cursor?: string, direction?: 'forward' | 'backward'): any;
}
