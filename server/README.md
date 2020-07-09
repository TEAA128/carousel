## Server API

### Get n-places in same location with relatively the same number of beds and price
  * GET `/api/places`

**Success Status Code:** `200`
**Success Status Code:** `400`

**Request Query**: Expects JSON with the following keys.

```json
    {
      "zipCode": "Number",
      "bedsNumber": "Number",
      "price": "Number",
    }
```

**Returns:** JSON

```json
    [{
      "placeId": "Number",
      "title": "String",
      "pictureUrl": "String",
      "zipCode": "Number",
      "typeOfRoom": "String",
      "bedsNumber": "Number",
      "rating": "Number",
      "totalReview": "Number",
      "plusHost": "Boolean",
      "superHost": "Boolean",
      "price": "Number",
      "link": "String"
    },
    ...
    ]
```

### Get user info
  * GET `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `200`
**Error  Status Code:** `400`

**Returns:** JSON

```json
    {
      "userId": "Number",
      "userName": "String",
      "lists": [
        {
          "listId": "Number", "listName": "String", "places": [ {"placeId": "Number"} ...]
        }
        ...
      ]
    }
```

### Create new list of liked places
  * POST `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `201`
**Error Status Code:** `400`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "userId": "Number",
      "listName": "Number",
      "placeId": "Number",
    }
```

### Update user's list of liked places
  * PATCH `/api/user/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `204`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "listId": "Number",
      "placeId": "Number",
    }
```

### Delete place from the list
  * DELETE `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `204`
**Error Status Code:** `400`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "listId": "Number",
      "placeId": "Number",
    }
```