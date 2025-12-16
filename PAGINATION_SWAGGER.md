# Cursor Pagination & Swagger Documentation

## 🎯 Overview

The API now features:
- **Cursor-based pagination** for all list endpoints
- **Comprehensive Swagger documentation** at `/api/docs`
- **Global validation** with class-validator

---

## 📖 Swagger Documentation

### Access Swagger UI

```bash
npm run start:dev
# Visit: http://localhost:3000/api/docs
```

The Swagger UI provides:
- Interactive API testing
- Complete endpoint documentation
- Request/response schemas
- Example payloads

---

## 🔄 Cursor Pagination

### Why Cursor Pagination?

✅ **Better Performance** - No skip/offset, uses indexed _id  
✅ **Consistency** - No duplicate/missing items when data changes  
✅ **Scalability** - Works efficiently with large datasets  
✅ **Stateless** - Cursor encodes position, no server-side state  

### How It Works

1. **First Request** (no cursor):
   ```
   GET /movies?limit=20
   ```

2. **Response** includes `nextCursor`:
   ```json
   {
     "data": [...],
     "pagination": {
       "nextCursor": "507f1f77bcf86cd799439011",
       "hasNext": true,
       "limit": 20
     }
   }
   ```

3. **Next Page** (use nextCursor):
   ```
   GET /movies?cursor=507f1f77bcf86cd799439011&limit=20
   ```

### Pagination Parameters

| Parameter | Type | Description | Default | Max |
|-----------|------|-------------|---------|-----|
| `cursor` | string | ID of last item from previous page | - | - |
| `limit` | number | Items per page | 20 | 100 |

### Response Format

```typescript
{
  data: T[];  // Array of items
  pagination: {
    nextCursor: string | null;   // Cursor for next page
    prevCursor: string | null;    // Cursor for prev page
    hasNext: boolean;              // More items available
    hasPrev: boolean;              // Previous page exists
    limit: number;                 // Items per page
  }
}
```

---

## 📍 API Endpoints with Pagination

### Movies

```bash
# First page
GET /movies?limit=20

# With filtering
GET /movies?genre=Action&limit=10

# With search
GET /movies?search=inception&limit=15

# Next page
GET /movies?cursor=507f1f77bcf86cd799439011&limit=20

# With sorting
GET /movies?sortBy=releaseDate&sortOrder=desc&limit=20
```

### TV Shows

```bash
# First page
GET /tvshows?limit=20

# With filtering
GET /tvshows?genre=Drama&limit=10

# Next page
GET /tvshows?cursor=507f1f77bcf86cd799439012&limit=20
```

### Content (Combined)

```bash
# All content
GET /content?limit=20

# Only movies
GET /content?type=movie&limit=20

# Only TV shows
GET /content?type=tvshow&limit=20

# With genre filter
GET /content?genre=Action&limit=15

# Next page
GET /content?type=movie&cursor=507f1f77bcf86cd799439011&limit=20
```

---

## 🔍 Complete Query Parameters

### Common Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `cursor` | string | Pagination cursor | `507f1f77bcf86cd799439011` |
| `limit` | number | Items per page (1-100) | `20` |
| `genre` | enum | Filter by genre | `Action`, `Drama`, `SciFi` |
| `search` | string | Search in title/description | `inception` |
| `sortBy` | string | Field to sort by | `releaseDate`, `title` |
| `sortOrder` | enum | Sort direction | `asc`, `desc` |

### Content-Specific

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `type` | enum | Content type filter | `movie`, `tvshow` |

---

## 📝 Example Responses

### Movies List with Pagination

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Inception",
      "description": "A thief who steals corporate secrets...",
      "genres": ["SciFi", "Action"],
      "releaseDate": "2010-07-16T00:00:00.000Z",
      "director": "Christopher Nolan",
      "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      "createdAt": "2024-12-16T08:00:00.000Z",
      "updatedAt": "2024-12-16T08:00:00.000Z"
    }
  ],
  "pagination": {
    "nextCursor": "507f1f77bcf86cd799439012",
    "prevCursor": null,
    "hasNext": true,
    "hasPrev": false,
    "limit": 20
  }
}
```

### Content List (Combined)

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Inception",
      "contentType": "Movie",
      ...
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "Breaking Bad",
      "contentType": "TVShow",
      ...
    }
  ],
  "pagination": {
    "nextCursor": "507f1f77bcf86cd799439016",
    "prevCursor": null,
    "hasNext": true,
    "hasPrev": false,
    "limit": 20
  }
}
```

---

## 🛠️ Implementation Details

### Cursor Pagination Helper

Located in [`src/common/utils/pagination.helper.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/common/utils/pagination.helper.ts)

```typescript
// Build cursor query
CursorPaginationHelper.buildCursorQuery(cursor)
// Returns: { _id: { $gt: cursor } }

// Create paginated response
CursorPaginationHelper.createCursorPaginatedResponse(data, limit, cursor)
```

### Service Pattern

```typescript
async findAll(filters?: {
  cursor?: string;
  limit?: number;
  genre?: string;
  search?: string;
}): Promise<CursorPaginatedResponse<T>> {
  const query: any = {};
  
  // Apply cursor
  if (filters?.cursor) {
    Object.assign(query, 
      CursorPaginationHelper.buildCursorQuery(filters.cursor)
    );
  }
  
  // Apply other filters
  if (filters?.genre) {
    query.genres = filters.genre;
  }
  
  const limit = filters?.limit || 20;
  
  // Fetch limit + 1 to check for more results
  const data = await this.model
    .find(query)
    .sort({ _id: 1 })
    .limit(limit + 1)
    .exec();
  
  return CursorPaginationHelper.createCursorPaginatedResponse(
    data,
    limit,
    filters?.cursor,
  );
}
```

---

## ✨ Features

### Swagger Features
- ✅ Interactive API testing
- ✅ Auto-generated documentation from decorators
- ✅ Request/response validation
- ✅ Example payloads
- ✅ Enum documentation for genres

### Pagination Features
- ✅ Cursor-based (no offset)
- ✅ Configurable limit (1-100)
- ✅ hasNext/hasPrev indicators
- ✅ Works with filtering & sorting
- ✅ Consistent results

### Validation Features
- ✅ Global ValidationPipe
- ✅ Auto-transform query params
- ✅ Whitelist unknown properties
- ✅ Type-safe DTOs

---

## 🚀 Quick Start

```bash
# Start server
npm run start:dev

# Access Swagger UI
open http://localhost:3000/api/docs

# Test pagination
curl "http://localhost:3000/movies?limit=5"

# Use nextCursor from response for next page
curl "http://localhost:3000/movies?cursor=CURSOR_VALUE&limit=5"
```

---

## 📚 Related Files

- [`main.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/main.ts) - Swagger configuration
- [`pagination.dto.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/common/dto/pagination.dto.ts) - Cursor pagination DTO
- [`pagination.helper.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/common/utils/pagination.helper.ts) - Pagination utilities
- [`paginated-response.interface.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/common/interfaces/paginated-response.interface.ts) - Response interface

All controllers now include comprehensive Swagger documentation!
