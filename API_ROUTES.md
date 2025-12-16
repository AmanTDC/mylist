# API Routes - Content Modules

## 📍 Available Routes

### **Movies Module** - `/movies`

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/movies` | Get all movies | `?genre=Action`, `?search=inception`, `?sortBy=releaseDate`, `?sortOrder=asc\|desc` |
| `GET` | `/movies/:id` | Get single movie | - |
| `POST` | `/movies` | Create movie | - |
| `PATCH` | `/movies/:id` | Update movie | - |
| `DELETE` | `/movies/:id` | Delete movie | - |

### **TVShows Module** - `/tvshows`

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/tvshows` | Get all TV shows | `?genre=Drama`, `?search=breaking`, `?sortBy=createdAt`, `?sortOrder=asc\|desc` |
| `GET` | `/tvshows/:id` | Get single TV show | - |
| `POST` | `/tvshows` | Create TV show | - |
| `PATCH` | `/tvshows/:id` | Update TV show | - |
| `DELETE` | `/tvshows/:id` | Delete TV show | - |

### **Content Module** - `/content`

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/content` | Get all content (movies + tvshows) | `?type=movie\|tvshow`, `?genre=Action`, `?search=...` |
| `GET` | `/content/:type/:id` | Get single content by type | type: `movie` or `tvshow` |

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

### Get Combined Content
```bash
# All content (movies + TV shows)
GET http://localhost:3000/content

# Only movies
GET http://localhost:3000/content?type=movie

# Only TV shows
GET http://localhost:3000/content?type=tvshow

# Filter by genre
GET http://localhost:3000/content?genre=Action

# Search across all content
GET http://localhost:3000/content?search=dark
```

### Get Single Content
```bash
GET http://localhost:3000/movies/507f1f77bcf86cd799439011
GET http://localhost:3000/tvshows/507f1f77bcf86cd799439012
GET http://localhost:3000/content/movie/507f1f77bcf86cd799439011
GET http://localhost:3000/content/tvshow/507f1f77bcf86cd799439012
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

### Content Response (Combined)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Inception",
    "description": "...",
    "genres": ["SciFi", "Action"],
    "releaseDate": "2010-07-16T00:00:00.000Z",
    "director": "Christopher Nolan",
    "actors": [...],
    "contentType": "Movie"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Breaking Bad",
    "description": "...",
    "genres": ["Drama"],
    "episodes": [...],
    "contentType": "TVShow"
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
│   ├── movies.controller.ts      # Handles /movies routes
│   ├── movies.service.ts          # CRUD + filtering logic
│   ├── dto/
│   │   ├── create-movie.dto.ts
│   │   └── update-movie.dto.ts
│   └── entities/
│       └── movie.entity.ts        # Mongoose schema
│
├── tvshows/
│   ├── tvshows.module.ts
│   ├── tvshows.controller.ts     # Handles /tvshows routes
│   ├── tvshows.service.ts         # CRUD + filtering logic
│   ├── dto/
│   │   ├── create-tvshow.dto.ts
│   │   └── update-tvshow.dto.ts
│   └── entities/
│       └── tvshow.entity.ts       # Mongoose schema
│
└── content/
    ├── content.module.ts
    ├── content.controller.ts      # Handles /content routes
    ├── content.service.ts          # Combines movies + tvshows
    └── dto/...
```

---

## ✨ Features Implemented

- ✅ Modular architecture (Movies, TVShows, Content)
- ✅ Full CRUD operations for movies and TV shows
- ✅ Genre filtering (`?genre=Action`)
- ✅ Text search (`?search=inception`)
- ✅ Sorting (`?sortBy=releaseDate&sortOrder=desc`)
- ✅ Combined content endpoint (`/content`)
- ✅ Type-based filtering (`?type=movie|tvshow`)
- ✅ DTOs with validation (class-validator)
- ✅ Mongoose schemas in respective modules
- ✅ Clean separation of concerns

---

## 🔜 Recommended Next Steps (MyList Module)

For your MyList requirements, you should create:

```bash
npx nest g resource mylist --no-spec
```

Then implement:
- `GET /mylist` - Get user's list with query params
- `POST /mylist/bulk` - Add multiple items (multi-select)
- `DELETE /mylist/bulk` - Remove multiple items (multi-select)
- `POST /mylist` - Add single item
- `DELETE /mylist/:itemId` - Remove single item
- `PATCH /mylist/:itemId` - Update notes/priority

Would you like me to create the MyList module next?
