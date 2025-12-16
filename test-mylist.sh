#!/bin/bash

# MyList API Test Script
# This script demonstrates all MyList endpoints with cursor pagination

echo "🧪 MyList API Test Suite"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:3000"

echo -e "${BLUE}📋 Step 1: Getting test data (movies and users)${NC}"
echo "----------------------------------------------"

# Get a movie ID
MOVIE_ID=$(curl -s "$API_URL/movies" | jq -r '.data[0]._id')
echo "Movie ID: $MOVIE_ID"

# Get another movie ID for second item
MOVIE_ID_2=$(curl -s "$API_URL/movies" | jq -r '.data[1]._id')
echo "Movie ID 2: $MOVIE_ID_2"

# Get a TV show ID
TVSHOW_ID=$(curl -s "$API_URL/tvshows" | jq -r '.data[0]._id')
echo "TV Show ID: $TVSHOW_ID"

echo ""
echo -e "${BLUE}📋 Step 2: Creating a test user${NC}"
echo "----------------------------------------------"

# For this demo, we'll use a hardcoded user ID (you should create a user in a real scenario)
USER_ID="675f000000000000000000a1"
echo "Using User ID: $USER_ID"

echo ""
echo -e "${GREEN}✅ Test 1: Add item to list (POST /mylist)${NC}"
echo "----------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/mylist" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"contentId\": \"$MOVIE_ID\",
    \"contentType\": \"Movie\",
    \"notes\": \"Must watch this weekend!\",
    \"priority\": 5
  }")
echo "$RESPONSE" | jq '.'
echo ""

echo -e "${GREEN}✅ Test 2: Add another item to list${NC}"
echo "----------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/mylist" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"contentId\": \"$MOVIE_ID_2\",
    \"contentType\": \"Movie\",
    \"notes\": \"Classic sci-fi\",
    \"priority\": 4
  }")
echo "$RESPONSE" | jq '.'
echo ""

echo -e "${GREEN}✅ Test 3: Add a TV show to list${NC}"
echo "----------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/mylist" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"contentId\": \"$TVSHOW_ID\",
    \"contentType\": \"TVShow\",
    \"notes\": \"Binge watch next week\",
    \"priority\": 3
  }")
echo "$RESPONSE" | jq '.'
echo ""

echo -e "${YELLOW}🔄 Test 4: Try adding duplicate (should fail)${NC}"
echo "----------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/mylist" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"contentId\": \"$MOVIE_ID\",
    \"contentType\": \"Movie\",
    \"notes\": \"Trying to add again\",
    \"priority\": 2
  }")
echo "$RESPONSE" | jq '.'
echo ""

echo -e "${GREEN}✅ Test 5: Get user's list (GET /mylist)${NC}"
echo "----------------------------------------------"
RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID&sortBy=priority&sortOrder=desc")
echo "$RESPONSE" | jq '.'

# Extract the first item ID for deletion test
ITEM_ID=$(echo "$RESPONSE" | jq -r '.data[0]._id // empty')
echo ""

if [ -n "$ITEM_ID" ]; then
  echo -e "${GREEN}✅ Test 6: Get list with cursor pagination (limit=2)${NC}"
  echo "----------------------------------------------"
  RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID&limit=2&sortBy=addedAt&sortOrder=desc")
  echo "$RESPONSE" | jq '.'
  
  NEXT_CURSOR=$(echo "$RESPONSE" | jq -r '.pagination.nextCursor // empty')
  echo ""
  
  if [ -n "$NEXT_CURSOR" ]; then
    echo -e "${GREEN}✅ Test 7: Get next page using cursor${NC}"
    echo "----------------------------------------------"
    RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID&limit=2&cursor=$NEXT_CURSOR&sortBy=addedAt&sortOrder=desc")
    echo "$RESPONSE" | jq '.'
    echo ""
  fi
  
  echo -e "${GREEN}✅ Test 8: Filter by content type (Movies only)${NC}"
  echo "----------------------------------------------"
  RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID&contentType=Movie")
  echo "$RESPONSE" | jq '.'
  echo ""
  
  echo -e "${GREEN}✅ Test 9: Filter by content type (TV Shows only)${NC}"
  echo "----------------------------------------------"
  RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID&contentType=TVShow")
  echo "$RESPONSE" | jq '.'
  echo ""
  
  echo -e "${GREEN}✅ Test 10: Remove item from list (DELETE /mylist/:itemId)${NC}"
  echo "----------------------------------------------"
  RESPONSE=$(curl -s -X DELETE "$API_URL/mylist/$ITEM_ID?userId=$USER_ID")
  echo "$RESPONSE" | jq '.'
  echo ""
  
  echo -e "${GREEN}✅ Test 11: Verify item was removed${NC}"
  echo "----------------------------------------------"
  RESPONSE=$(curl -s "$API_URL/mylist?userId=$USER_ID")
  echo "$RESPONSE" | jq '.'
  echo ""
fi

echo ""
echo -e "${BLUE}🎉 All tests completed!${NC}"
echo "========================"
