import {
    CursorPaginatedResponse,
    CursorPaginationMeta,
} from '../interfaces/paginated-response.interface';

export class CursorPaginationHelper {
    /**
     * Create a cursor-paginated response
     */
    static createCursorPaginatedResponse<T extends { _id?: any; id?: any }>(
        data: T[],
        limit: number,
        requestedCursor?: string,
    ): CursorPaginatedResponse<T> {
        const hasNext = data.length > limit;
        const items = hasNext ? data.slice(0, limit) : data;

        const nextCursor =
            hasNext && items.length > 0
                ? this.getCursorFromItem(items[items.length - 1])
                : null;

        const prevCursor = requestedCursor || null;
        const hasPrev = !!requestedCursor;

        return {
            data: items,
            pagination: {
                nextCursor,
                prevCursor,
                hasNext,
                hasPrev,
                limit,
            },
        };
    }

    /**
     * Extract cursor from item (typically the _id)
     */
    static getCursorFromItem(item: any): string {
        // Use _id if available (MongoDB), otherwise id
        const id = item._id || item.id;
        return id ? id.toString() : '';
    }

    /**
     * Build query for cursor pagination
     * For forward pagination (next page): find items where _id > cursor
     * For backward pagination (prev page): find items where _id < cursor
     */
    static buildCursorQuery(
        cursor?: string,
        direction: 'forward' | 'backward' = 'forward',
    ): any {
        if (!cursor) {
            return {};
        }

        return {
            _id: direction === 'forward' ? { $gt: cursor } : { $lt: cursor },
        };
    }
}
