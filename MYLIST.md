# MyListItem Collection - Separate Collection Architecture

## Overview

The `MyListItem` collection stores individual user watchlist items as separate documents, providing better scalability and query flexibility compared to embedded documents.

## Schema: [`mylist.schema.ts`](file:///Users/amangupta/Assesments/my-list-feature/src/schemas/mylist.schema.ts)

```typescript
@Schema({ timestamps: true })
export class MyListItem {
  userId: Types.ObjectId;      // Reference to User
  contentId: Types.ObjectId;   // Reference to Movie or TVShow
  contentType: ContentType;    // 'Movie' or 'TVShow'
  addedAt: Date;               // When added to list
  notes?: string;              // Optional user notes
  priority?: number;           // 1-5, higher = more urgent
}
```

### Key Features

1. **Separate Documents**: Each list item is its own document
2. **User Reference**: `userId` links to the User collection
3. **Content Reference**: `contentId` can point to Movie or TVShow
4. **Content Type**: Enum to distinguish between movies and TV shows
5. **Metadata**: Notes and priority for organization
6. **Timestamps**: Automatic `createdAt` and `updatedAt`

### Indexes

```typescript
// Efficient userId lookups
MyListItemSchema.index({ userId: 1 });

// Find all users who added a specific content
MyListItemSchema.index({ contentId: 1 });

// Prevent duplicates (user can't add same content twice)
MyListItemSchema.index({ userId: 1, contentId: 1 }, { unique: true });
```

## Why Separate Collection?

### ✅ Advantages

- **Scalability**: Users can have unlimited list items without document size limits
- **Flexible Queries**: Easy to find:
  - All items for a user
  - All users who added specific content
  - Popular content across all lists
- **Pagination**: Easy to paginate through large lists
- **Analytics**: Better for tracking trends and popularity
- **Atomic Operations**: Add/remove items independently

### ❌ Previous Embedded Approach Limitations

- Document size limits (16MB)
- Harder to query items across users
- More complex pagination
- Less flexible for analytics

## Sample Queries

### Get All Items for a User
```typescript
const userItems = await myListItemModel
  .find({ userId: user._id })
  .sort({ priority: -1, addedAt: -1 })
  .exec();
```

### Get All Users Who Added a Movie
```typescript
const usersWhoAdded = await myListItemModel
  .find({ contentId: movieId, contentType: ContentType.Movie })
  .populate('userId', 'username')
  .exec();
```

### Get User's Movies Only
```typescript
const movies = await myListItemModel
  .find({ 
    userId: user._id,
    contentType: ContentType.Movie 
  })
  .exec();
```

### Most Popular Content in Lists
```typescript
const popular = await myListItemModel.aggregate([
  { $group: { _id: '$contentId', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
]);
```

### Add Item (with duplicate prevention)
```typescript
try {
  const item = await myListItemModel.create({
    userId: user._id,
    contentId: movie._id,
    contentType: ContentType.Movie,
    notes: 'Must watch!',
    priority: 5,
  });
} catch (error) {
  // Unique index will prevent duplicates
  if (error.code === 11000) {
    throw new Error('Item already in list');
  }
}
```

### Remove Item
```typescript
await myListItemModel.deleteOne({
  userId: user._id,
  contentId: movie._id,
});
```

## Seed Data

The seed script creates **12 individual MyListItem documents**:
- john_doe: 3 items
- jane_smith: 2 items
- mike_horror_fan: 2 items
- comedy_lover: 2 items
- fantasy_explorer: 3 items

Each item includes realistic metadata like notes and priority.

## Best Practices

1. **Always use the compound index** when querying to prevent duplicates
2. **Populate references** when you need user or content details
3. **Use aggregation** for analytics and statistics
4. **Implement pagination** for user lists (use `skip` and `limit`)
5. **Soft deletes** if you want to track removal history (add `isDeleted` field)

## Next Steps for API Implementation

1. Create a MyList module: `npx nest g module mylist`
2. Create a MyList service: `npx nest g service mylist`
3. Create a MyList controller: `npx nest g controller mylist`
4. Implement endpoints:
   - `GET /users/:id/mylist` - Get user's list
   - `POST /users/:id/mylist` - Add item to list
   - `DELETE /users/:id/mylist/:itemId` - Remove from list
   - `PATCH /users/:id/mylist/:itemId` - Update notes/priority
   - `GET /content/:id/users` - Get users who added this content
