# My List Feature

A NestJS-based backend service for managing a user's watchlist of Movies and TV Shows.

## 🚀 Setup and Running

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
   *Ensure `MONGODB_URI` matches your local MongoDB instance.*

### Running the Application
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Seeding Data
To populate the database with Movies, TV Shows, Users, and sample List Items:
```bash
npm run seed
```

### Running Tests
```bash
# Unit Tests
npm test

# E2E Tests
npm run test:e2e
```

## 🏗 Design Choices

### Modular Architecture
The application is structured into domain-specific modules:
- **MoviesModule & TvshowsModule**: Handle catalog data.
- **ContentModule**: A unified facade for accessing both content types. Implements **Caching** here to aggregate data efficiently.
- **MylistModule**: Manages the user's personal list. Depends on `ContentModule` to fetch details.

### Caching Strategy
- **Content Details**: Fetched via `ContentModule` and cached using `cache-manager`.
- **Reasoning**: Content details (Title, Description, etc.) rarely change. Caching them prevents redundant database lookups when listing user items, solving the N+1 problem.

### Pagination
- **Cursor-based Pagination**: Implemented for `GET /mylist`.
- **Reasoning**: Superior for endless scroll interfaces compared to offset-based pagination. It handles data insertion/deletion gracefully without skipping items or showing duplicates.

## 📝 Assumptions
- **Authentication**: Usage of `userId` in DTOs assumes a pre-validated ID from an upstream auth guard (mocked for this assignment).
- **Data Consistency**: Content is immutable for the scope of this assignment. If content were frequently updated, a more robust cache invalidation strategy (e.g., event-based) would be required.

## 📚 API Documentation
Swagger documentation is available at `/api/docs` when the server is running.
