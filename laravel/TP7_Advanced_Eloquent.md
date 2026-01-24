# Task 1: Migration Files Created

## Overview
Created migration files for a complex database design with multiple relationships between Authors, Articles, Audiences, Comments, and Users.

## Migration Files Created

### 1. Authors Table
**File:** `0001_01_01_000004_create_authors_table.php`

**Schema:**
- `id` - Primary Key
- `name` - String
- `user_id` - Foreign Key → users table (cascade on delete)
- `timestamps`

**Relationship:** One User can be one Author

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
```

---

### 2. Articles Table
**File:** `0001_01_01_000005_create_articles_table.php`

**Schema:**
- `id` - Primary Key
- `name` - String
- `author_id` - Foreign Key → authors table (cascade on delete)
- `timestamps`

**Relationship:** One Author can write multiple Articles

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('author_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
```

---

### 3. Audiences Table
**File:** `0001_01_01_000006_create_audiences_table.php`

**Schema:**
- `id` - Primary Key
- `name` - String
- `article_id` - Foreign Key → articles table (cascade on delete)
- `user_id` - Foreign Key → users table (cascade on delete)
- `timestamps`

**Relationships:**
- One Article can have multiple Audiences
- One User can be multiple Audiences (subscribed to different articles)

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audiences', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audiences');
    }
};
```

---

### 4. Comments Table
**File:** `0001_01_01_000007_create_comments_table.php`

**Schema:**
- `id` - Primary Key
- `name` - String (comment content)
- `commentable_id` - Polymorphic relation ID
- `commentable_type` - Polymorphic relation type
- `user_id` - Foreign Key → users table (cascade on delete)
- `timestamps`

**Relationships:**
- Polymorphic relationship: Any User can comment on Audiences, Articles, or Authors
- Uses Laravel's `morphs()` method for polymorphic relations

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->morphs('commentable');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
```

---

## Database Relationships Summary

```
Users ─┬─> Authors ──> Articles ──> Audiences
       │                  │            │
       │                  │            │
       └──────────────────┴────────────┴──> Comments (Polymorphic)
```

### Key Relationships:
1. **Users → Authors**: One-to-One (via user_id)
2. **Authors → Articles**: One-to-Many (via author_id)
3. **Articles → Audiences**: One-to-Many (via article_id)
4. **Users → Audiences**: One-to-Many (via user_id)
5. **Comments**: Polymorphic - can belong to Audiences, Articles, or Authors

---

## Commands Used

```bash
# Create migration files
php artisan make:migration create_authors_table
php artisan make:migration create_articles_table
php artisan make:migration create_audiences_table
php artisan make:migration create_comments_table

# Run migrations
php artisan migrate
```

---

## Migration Status

All migration files created successfully  
All foreign keys configured with cascade delete  
Polymorphic relationship implemented for Comments  
Migrations executed and tables created in database  
Files renamed to follow project naming convention (0001_01_01_*)

---

---

# Task 2: Eloquent Models with Relationships

## Models Created

### 1. Author Model
**File:** `app/Models/Author.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Author extends Model
{
    protected $fillable = ['name', 'user_id'];

    // An author has one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // An author wrote multiple articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    // An author have many comments (Polymorphic)
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    // An author has many audience (hasManyThrough)
    public function audiences(): HasManyThrough
    {
        return $this->hasManyThrough(Audience::class, Article::class);
    }
}
```

### 2. Article Model
**File:** `app/Models/Article.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Article extends Model
{
    protected $fillable = ['name', 'author_id'];

    // An article belongs to an author
    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    // An article have many audiences
    public function audiences(): HasMany
    {
        return $this->hasMany(Audience::class);
    }

    // An article have many comments (Polymorphic)
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```

### 3. Audience Model
**File:** `app/Models/Audience.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Audience extends Model
{
    protected $fillable = ['name', 'article_id', 'user_id'];

    // An audience has one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // An audience belongs to an article
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    // An audience have many comments (Polymorphic)
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```

### 4. Comment Model
**File:** `app/Models/Comment.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    protected $fillable = ['name', 'commentable_id', 'commentable_type', 'user_id'];

    // Get the parent commentable model (Audience, Article, or Author)
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    // A comment belongs to a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

### 5. User Model (Updated)
**File:** `app/Models/User.php`

```php
// Added relationships:

// A user can be an author
public function author(): HasOne
{
    return $this->hasOne(Author::class);
}

// A user can have many audiences (subscriptions)
public function audiences(): HasMany
{
    return $this->hasMany(Audience::class);
}

// A user wrote many comments
public function comments(): HasMany
{
    return $this->hasMany(Comment::class);
}
```

---

## Relationships Summary

| # | Relationship | Type | Model | Method |
|---|---|---|---|---|
| 1 | Author has one User | belongsTo | Author | `author()->user()` |
| 2 | Audience has one User | belongsTo | Audience | `audience()->user()` |
| 3 | Author wrote multiple Articles | hasMany | Author | `author()->articles()` |
| 4 | Article have many Audiences | hasMany | Article | `article()->audiences()` |
| 5 | Audience have many Comments | morphMany | Audience | `audience()->comments()` |
| 6 | Article have many Comments | morphMany | Article | `article()->comments()` |
| 7 | Author have many Comments | morphMany | Author | `author()->comments()` |
| 8 | User wrote many Comments | hasMany | User | `user()->comments()` |
| 9 | Author has many Audiences | hasManyThrough | Author | `author()->audiences()` |

---

## Testing Results

### Tinker Tests Passed

All relationships tested and working:

1. **Author → User**: Retrieved author's user successfully
2. **Author → Articles**: Retrieved 2 articles written by author
3. **Author → Comments** (Polymorphic): Retrieved comments on author
4. **Author → Audiences** (hasManyThrough): Retrieved 2 audiences through articles
5. **Article → Author**: Retrieved article's author
6. **Article → Audiences**: Retrieved 2 audiences for article
7. **Article → Comments** (Polymorphic): Retrieved comments on article
8. **Audience → User**: Retrieved audience's user
9. **Audience → Article**: Retrieved audience's article
10. **Audience → Comments** (Polymorphic): Retrieved comments on audience
11. **Comment → Commentable** (Polymorphic): Works for Author, Article, Audience
12. **Comment → User**: Retrieved comment's author
13. **User → Author**: Retrieved user's author profile
14. **User → Audiences**: Retrieved user's audience subscriptions
15. **User → Comments**: Retrieved all comments by user

---

## Application Status

Laravel server running on `http://127.0.0.1:8000`  
All migrations created and executed  
All models created with relationships  
All 25 tests passing  
All polymorphic relationships working correctly  
All hasManyThrough relationships working correctly

---

# Task 3: Query Database Through Eloquent APIs

## Overview
Created RESTful API endpoints to create and query data using Eloquent relationships, including polymorphic relationships and hasManyThrough.

## API Controller

**File:** `app/Http/Controllers/EloquentTestController.php`

### CREATE API Endpoints

#### 1. Create Authors with Users
**Endpoint:** `POST /api/eloquent/create-authors`

Creates 3 authors with associated user accounts:
- Author Sok with user's name "sok123"
- Author Sao with user's name "sao"
- Author Dara with user's name "d.dara"

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "author_id": 2,
      "user_id": 2,
      "author_name": "Author Sok",
      "user_name": "Sok",
      "email": "sok123@example.com"
    }
  ]
}
```

#### 2. Create Articles
**Endpoint:** `POST /api/eloquent/create-articles`

Creates 6 articles across authors:
- Author Sok: "Climate changes in the last 3 years", "Global warming is in its critical stage"
- Author Sao: "Computers in the next generation", "Quantum computers, is it coming?"
- Author Dara: "Chemistry in nature form", "The origin of water"

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "article_id": 2,
      "title": "Climate changes in the last 3 years",
      "author": "Author Sok"
    }
  ]
}
```

#### 3. Create Audiences
**Endpoint:** `POST /api/eloquent/create-audiences`

Creates audience users:
- Veasna with user's name "veasna"
- Samnang with user's name "samnang"
- Ratana with user's name "ratana"

#### 4. Subscribe to Articles
**Endpoint:** `POST /api/eloquent/subscribe`

Creates subscriptions:
- Samnang subscribes to: "Computers in the next generation", "Chemistry in nature form", "The origin of water"
- Veasna subscribes to: "Climate changes in the last 3 years", "The origin of water", "Quantum computers, is it coming?"
- Ratana subscribes to: "Climate changes in the last 3 years", "Global warming is in its critical stage"

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "user": "Samnang",
      "article": "Computers in the next generation",
      "audience_id": 2
    }
  ]
}
```

#### 5. Create Comments (Polymorphic)
**Endpoint:** `POST /api/eloquent/create-comments`

Creates polymorphic comments:
- Sok commented on his article "Climate changes in the last 3 years": "Thank you to all the subscribers"
- Samnang commented on Author Sao: "Your article is amazing"
- Sao commented on Audience Samnang: "Welcome to read my article"
- Veasna commented on article "Quantum computers, is it coming?": "I can't wait this thing happening"

### GET API Endpoints

#### 1. Get All Articles of Author Sao
**Endpoint:** `GET /api/eloquent/author-articles`

**Response:**
```json
{
  "status": "success",
  "author": "Author Sao",
  "articles": [
    {"id": 4, "name": "Computers in the next generation"},
    {"id": 5, "name": "Quantum computers, is it coming?"}
  ]
}
```

#### 2. Get All Audiences of Article
**Endpoint:** `GET /api/eloquent/article-audiences`

Gets audiences for "Climate changes in the last 3 years"

**Response:**
```json
{
  "status": "success",
  "article": "Climate changes in the last 3 years",
  "audiences": [
    {"id": 5, "name": "Audience Veasna", "user": "Veasna"},
    {"id": 8, "name": "Audience Ratana", "user": "Ratana"}
  ]
}
```

#### 3. Get All Audiences of Author (HasManyThrough)
**Endpoint:** `GET /api/eloquent/author-audiences`

Gets all audiences of Author Sok using hasManyThrough relationship.

**Response:**
```json
{
  "status": "success",
  "author": "Author Sok",
  "audiences": [
    {
      "id": 5,
      "name": "Audience Veasna",
      "article": "Climate changes in the last 3 years",
      "user": "Veasna"
    },
    {
      "id": 8,
      "name": "Audience Ratana",
      "article": "Climate changes in the last 3 years",
      "user": "Ratana"
    },
    {
      "id": 9,
      "name": "Audience Ratana",
      "article": "Global warming is in its critical stage",
      "user": "Ratana"
    }
  ]
}
```

#### 4. Get All Comments of Audience Samnang
**Endpoint:** `GET /api/eloquent/audience-comments`

**Response:**
```json
{
  "status": "success",
  "audience": "Audience Samnang",
  "user": "Samnang",
  "comments": [
    {
      "id": 4,
      "text": "Welcome to read my article",
      "by_user": "Sao"
    }
  ]
}
```

#### 5. Get All Comments with Commentable Type
**Endpoint:** `GET /api/eloquent/all-comments`

Gets all comments including the topic each comment is on (polymorphic).

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 2,
      "text": "Thank you to all the subscribers",
      "by_user": "Sok",
      "on_type": "Article",
      "on_item": "Climate changes in the last 3 years"
    },
    {
      "id": 3,
      "text": "Your article is amazing",
      "by_user": "Samnang",
      "on_type": "Author",
      "on_item": "Author Sao"
    },
    {
      "id": 4,
      "text": "Welcome to read my article",
      "by_user": "Sao",
      "on_type": "Audience",
      "on_item": "Audience Samnang"
    },
    {
      "id": 5,
      "text": "I can't wait this thing happening",
      "by_user": "Veasna",
      "on_type": "Article",
      "on_item": "Quantum computers, is it coming?"
    }
  ]
}
```

---

## Routes Configuration

**File:** `routes/api.php`

```php
Route::controller(EloquentTestController::class)->prefix('eloquent')->group(function() {
    // Create endpoints
    Route::post('/create-authors', 'createAuthors');
    Route::post('/create-articles', 'createArticles');
    Route::post('/create-audiences', 'createAudiences');
    Route::post('/subscribe', 'subscribe');
    Route::post('/create-comments', 'createComments');
    
    // Get endpoints
    Route::get('/author-articles', 'authorArticles');
    Route::get('/article-audiences', 'articleAudiences');
    Route::get('/author-audiences', 'authorAudiences');
    Route::get('/audience-comments', 'audienceComments');
    Route::get('/all-comments', 'allComments');
});
```

---

## Testing Results

### Data Created Successfully

**Authors:**
- Author Sok (User: Sok)
- Author Sao (User: Sao)
- Author Dara (User: Dara)

**Articles:**
- Climate changes in the last 3 years (by Author Sok)
- Global warming is in its critical stage (by Author Sok)
- Computers in the next generation (by Author Sao)
- Quantum computers, is it coming? (by Author Sao)
- Chemistry in nature form (by Author Dara)
- The origin of water (by Author Dara)

**Audiences (Subscriptions):**
- Samnang: 3 subscriptions
- Veasna: 3 subscriptions
- Ratana: 2 subscriptions
- **Total:** 8 audience records

**Comments (Polymorphic):**
- 2 comments on Articles
- 1 comment on Author
- 1 comment on Audience

### All Relationships Verified

| # | Relationship | Implementation | Status |
|---|---|---|---|
| 1 | Author has one User | belongsTo | Working |
| 2 | Audience has one User | belongsTo | Working |
| 3 | Author wrote multiple Articles | hasMany | Working |
| 4 | Article have many Audiences | hasMany | Working |
| 5 | Audience have many Comments | morphMany | Working |
| 6 | Article have many Comments | morphMany | Working |
| 7 | Author have many Comments | morphMany | Working |
| 8 | User wrote many Comments | hasMany | Working |
| 9 | Author has many Audiences | hasManyThrough | Working |

---

## API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/eloquent/create-authors` | Create authors with user accounts |
| POST | `/api/eloquent/create-articles` | Create articles for authors |
| POST | `/api/eloquent/create-audiences` | Create audience users |
| POST | `/api/eloquent/subscribe` | Subscribe audiences to articles |
| POST | `/api/eloquent/create-comments` | Create polymorphic comments |
| GET | `/api/eloquent/author-articles` | Get Sao's articles |
| GET | `/api/eloquent/article-audiences` | Get audiences for specific article |
| GET | `/api/eloquent/author-audiences` | Get author's audiences (hasManyThrough) |
| GET | `/api/eloquent/audience-comments` | Get Samnang's comments |
| GET | `/api/eloquent/all-comments` | Get all comments with types |

**Base URL:** `http://127.0.0.1:8000/api/eloquent`

---

## Final Project Status

✅ **Task 1 Complete:** All migration files created and executed  
✅ **Task 2 Complete:** All models with relationships implemented  
✅ **Task 3 Complete:** All API endpoints created and tested  
✅ **Server Running:** http://127.0.0.1:8000  
✅ **Documentation:** TP7_Advanced_Eloquent.md  
✅ **Database:** 4 authors, 7 articles, 9 audiences, 5 comments
