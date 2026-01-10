<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    protected $fillable = ['name', 'commentable_id', 'commentable_type', 'user_id'];

    /**
     * Get the parent commentable model (Audience, Article, or Author)
     */
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * A comment belongs to a user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
