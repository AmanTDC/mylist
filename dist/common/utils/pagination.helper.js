"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorPaginationHelper = void 0;
class CursorPaginationHelper {
    static createCursorPaginatedResponse(data, limit, requestedCursor) {
        const hasNext = data.length > limit;
        const items = hasNext ? data.slice(0, limit) : data;
        const nextCursor = hasNext && items.length > 0
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
    static getCursorFromItem(item) {
        const id = item._id || item.id;
        return id ? id.toString() : '';
    }
    static buildCursorQuery(cursor, direction = 'forward') {
        if (!cursor) {
            return {};
        }
        return {
            _id: direction === 'forward' ? { $gt: cursor } : { $lt: cursor },
        };
    }
}
exports.CursorPaginationHelper = CursorPaginationHelper;
//# sourceMappingURL=pagination.helper.js.map