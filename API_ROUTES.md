# API Routes - Content Modules

> [!IMPORTANT]
> **Read-Only Access**: Movies and TV shows endpoints are now **READ-ONLY**. Create, update, and delete operations have been removed.

## 📍 Available Routes

### **Movies Module** - `/movies` (Read-Only)

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/movies` | Get all movies | `?genre=Action`, `?search=inception`, `?sortBy=releaseDate`, `?sortOrder=asc\|desc` |
| `GET` | `/movies/:id` | Get single movie | - |

### **TVShows Module** - `/tvshows` (Read-Only)

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/tvshows` | Get all TV shows | `?genre=Drama`, `?search=breaking`, `?sortBy=createdAt`, `?sortOrder=asc\|desc` |
| `GET` | `/tvshows/:id` | Get single TV show | - |

### **MyList Module** - `/mylist`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/mylist` | Get user's list with cursor pagination |
| `POST` | `/mylist` | Add item to user's list |
| `DELETE` | `/mylist/:itemId` | Remove item from user's list |

### **User Module** - `/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Get all users with cursor pagination |
| `GET` | `/users/:id` | Get single user |

---

## 🔍 Usage Examples

### Get All Movies
```bash
GET http://localhost:3000/movies
GET http://localhost:3000/movies?genre=Action
GET http://localhost:3000/movies?search=inception
GET http://localhost:3000/movies?sortBy=releaseDate&sortOrder=desc
```

### Get All TV Shows
```bash
GET http://localhost:3000/tvshows
GET http://localhost:3000/tvshows?genre=Drama
GET http://localhost:3000/tvshows?search=breaking
```

### Get Single Content
```bash
GET http://localhost:3000/movies/507f1f77bcf86cd799439011
GET http://localhost:3000/tvshows/507f1f77bcf86cd799439012
```

### MyList Operations
```bash
# Get user's list
GET http://localhost:3000/mylist?userId=user123

# Add item to list
POST http://localhost:3000/mylist
{
  "userId": "user123",
  "contentId": "507f1f77bcf86cd799439011",
  "contentType": "Movie"
}

# Remove item from list
DELETE http://localhost:3000/mylist/507f1f77bcf86cd799439999
```

---

## 📝 Example Responses

### Movies Response
```json
[
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
]
```

---

## 🚀 Start the Server

```bash
npm run start:dev
```

Server runs on `http://localhost:3000`

---

## 📚 Module Structure

```
src/
├── movies/
│   ├── movies.module.ts
│   ├── movies.controller.ts      # Handles /movies routes (READ-ONLY)
│   ├── movies.service.ts          # Read operations only
│   ├── dto/
│   │   ├── create-movie.dto.ts
│   │   └── update-movie.dto.ts
│   └── entities/
│       └── movie.entity.ts        # Mongoose schema
│
├── tvshows/
│   ├── tvshows.module.ts
│   ├── tvshows.controller.ts     # Handles /tvshows routes (READ-ONLY)
│   ├── tvshows.service.ts         # Read operations only
│   └── entities/
│       └── tvshow.entity.ts       # Mongoose schema
│
├── mylist/
│   ├── mylist.module.ts
│   ├── mylist.controller.ts       # Handles /mylist routes
│   ├── mylist.service.ts          # Full CRUD operations
│   └── ...
│
└── user/
    ├── user.module.ts
    ├── user.controller.ts         # Handles /users routes
    └── ...
```

---

## ✨ Features Implemented

- ✅ Modular architecture (Movies, TVShows, MyList, User)
- ✅ Read-only access for movies and TV shows
- ✅ Full CRUD operations for MyList
- ✅ Genre filtering (`?genre=Action`)
- ✅ Text search (`?search=inception`)
- ✅ Sorting (`?sortBy=releaseDate&sortOrder=desc`)
- ✅ Cursor-based pagination
- ✅ DTOs with validation (class-validator)
- ✅ Mongoose schemas in respective modules
- ✅ Clean separation of concerns

---

## 🔒 Removed Operations

The following operations have been removed:
- ❌ `POST /movies` - Create movie
- ❌ `PATCH /movies/:id` - Update movie
- ❌ `DELETE /movies/:id` - Delete movie
- ❌ `POST /tvshows` - Create TV show
- ❌ `PATCH /tvshows/:id` - Update TV show
- ❌ `DELETE /tvshows/:id` - Delete TV show
- ❌ `/content/*` - All content endpoints (module removed)

