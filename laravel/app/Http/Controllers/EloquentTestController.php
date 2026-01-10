<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Author;
use App\Models\Article;
use App\Models\Audience;
use App\Models\Comment;

class EloquentTestController extends Controller
{
    // ============ CREATE APIS ============

    /**
     * Create authors with users
     * POST /api/eloquent/create-authors
     */
    public function createAuthors()
    {
        $authors = [
            ['name' => 'Sok', 'email' => 'sok123@example.com', 'author_name' => 'Author Sok'],
            ['name' => 'Sao', 'email' => 'sao@example.com', 'author_name' => 'Author Sao'],
            ['name' => 'Dara', 'email' => 'd.dara@example.com', 'author_name' => 'Author Dara'],
        ];

        $results = [];
        foreach ($authors as $authorData) {
            $user = User::create([
                'name' => $authorData['name'],
                'email' => $authorData['email'],
                'password' => bcrypt($authorData['name']),
            ]);

            $author = Author::create([
                'name' => $authorData['author_name'],
                'user_id' => $user->id,
            ]);

            $results[] = [
                'author_id' => $author->id,
                'user_id' => $user->id,
                'author_name' => $author->name,
                'user_name' => $user->name,
                'email' => $user->email,
            ];
        }

        return response()->json(['status' => 'success', 'data' => $results]);
    }

    /**
     * Create articles for authors
     * POST /api/eloquent/create-articles
     */
    public function createArticles()
    {
        $articles = [
            ['title' => 'Climate changes in the last 3 years', 'author_name' => 'Sok'],
            ['title' => 'Global warming is in its critical stage', 'author_name' => 'Sok'],
            ['title' => 'Computers in the next generation', 'author_name' => 'Sao'],
            ['title' => 'Quantum computers, is it coming?', 'author_name' => 'Sao'],
            ['title' => 'Chemistry in nature form', 'author_name' => 'Dara'],
            ['title' => 'The origin of water', 'author_name' => 'Dara'],
        ];

        $results = [];
        foreach ($articles as $articleData) {
            $author = Author::where('name', 'like', '%' . $articleData['author_name'] . '%')->first();
            if ($author) {
                $article = Article::create([
                    'name' => $articleData['title'],
                    'author_id' => $author->id,
                ]);

                $results[] = [
                    'article_id' => $article->id,
                    'title' => $article->name,
                    'author' => $author->name,
                ];
            }
        }

        return response()->json(['status' => 'success', 'data' => $results]);
    }

    /**
     * Create audiences with users
     * POST /api/eloquent/create-audiences
     */
    public function createAudiences()
    {
        $audiences = [
            ['name' => 'Veasna', 'email' => 'veasna@example.com', 'audience_name' => 'Audience Veasna'],
            ['name' => 'Samnang', 'email' => 'samnang@example.com', 'audience_name' => 'Audience Samnang'],
            ['name' => 'Ratana', 'email' => 'ratana@example.com', 'audience_name' => 'Audience Ratana'],
        ];

        $results = [];
        foreach ($audiences as $audienceData) {
            $user = User::create([
                'name' => $audienceData['name'],
                'email' => $audienceData['email'],
                'password' => bcrypt($audienceData['name']),
            ]);

            // We'll store the audience user info but associate with articles in subscribe endpoint
            $results[] = [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'email' => $user->email,
            ];
        }

        return response()->json(['status' => 'success', 'data' => $results]);
    }

    /**
     * Subscribe audiences to articles
     * POST /api/eloquent/subscribe
     */
    public function subscribe()
    {
        $subscriptions = [
            ['user_name' => 'Samnang', 'articles' => ['Computers in the next generation', 'Chemistry in nature form', 'The origin of water']],
            ['user_name' => 'Veasna', 'articles' => ['Climate changes in the last 3 years', 'The origin of water', 'Quantum computers, is it coming?']],
            ['user_name' => 'Ratana', 'articles' => ['Climate changes in the last 3 years', 'Global warming is in its critical stage']],
        ];

        $results = [];
        foreach ($subscriptions as $subscription) {
            $user = User::where('name', $subscription['user_name'])->first();
            if ($user) {
                foreach ($subscription['articles'] as $articleName) {
                    $article = Article::where('name', $articleName)->first();
                    if ($article) {
                        $audience = Audience::create([
                            'name' => 'Audience ' . $subscription['user_name'],
                            'article_id' => $article->id,
                            'user_id' => $user->id,
                        ]);

                        $results[] = [
                            'user' => $subscription['user_name'],
                            'article' => $articleName,
                            'audience_id' => $audience->id,
                        ];
                    }
                }
            }
        }

        return response()->json(['status' => 'success', 'data' => $results]);
    }

    /**
     * Create comments on articles/audiences/authors
     * POST /api/eloquent/create-comments
     */
    public function createComments()
    {
        $results = [];

        // Sok commented on his article
        $sokAuthor = Author::where('name', 'like', '%Sok%')->first();
        $sokArticle = Article::where('name', 'Climate changes in the last 3 years')->first();
        if ($sokAuthor && $sokArticle) {
            $comment = Comment::create([
                'name' => 'Thank you to all the subscribers',
                'commentable_id' => $sokArticle->id,
                'commentable_type' => 'App\Models\Article',
                'user_id' => $sokAuthor->user_id,
            ]);
            $results[] = ['type' => 'Article Comment', 'user' => 'Sok', 'text' => $comment->name];
        }

        // Samnang commented on Sao author
        $samnangUser = User::where('name', 'Samnang')->first();
        $saoAuthor = Author::where('name', 'like', '%Sao%')->first();
        if ($samnangUser && $saoAuthor) {
            $comment = Comment::create([
                'name' => 'Your article is amazing',
                'commentable_id' => $saoAuthor->id,
                'commentable_type' => 'App\Models\Author',
                'user_id' => $samnangUser->id,
            ]);
            $results[] = ['type' => 'Author Comment', 'user' => 'Samnang', 'text' => $comment->name];
        }

        // Sao commented on Samnang audience
        $saoAuthor = Author::where('name', 'like', '%Sao%')->first();
        $samnangAudience = Audience::whereHas('user', function($q) {
            $q->where('name', 'Samnang');
        })->first();
        if ($saoAuthor && $samnangAudience) {
            $comment = Comment::create([
                'name' => 'Welcome to read my article',
                'commentable_id' => $samnangAudience->id,
                'commentable_type' => 'App\Models\Audience',
                'user_id' => $saoAuthor->user_id,
            ]);
            $results[] = ['type' => 'Audience Comment', 'user' => 'Sao', 'text' => $comment->name];
        }

        // Veasna commented on article
        $veasnaUser = User::where('name', 'Veasna')->first();
        $quantumArticle = Article::where('name', 'Quantum computers, is it coming?')->first();
        if ($veasnaUser && $quantumArticle) {
            $comment = Comment::create([
                'name' => 'I can\'t wait this thing happening',
                'commentable_id' => $quantumArticle->id,
                'commentable_type' => 'App\Models\Article',
                'user_id' => $veasnaUser->id,
            ]);
            $results[] = ['type' => 'Article Comment', 'user' => 'Veasna', 'text' => $comment->name];
        }

        return response()->json(['status' => 'success', 'data' => $results]);
    }

    // ============ GET APIS ============

    /**
     * Get all articles of author Sao
     * GET /api/eloquent/author-articles
     */
    public function authorArticles()
    {
        $author = Author::where('name', 'like', '%Sao%')->first();
        
        if (!$author) {
            return response()->json(['status' => 'error', 'message' => 'Author not found'], 404);
        }

        $articles = $author->articles()->get();
        
        return response()->json([
            'status' => 'success',
            'author' => $author->name,
            'articles' => $articles->map(fn($a) => ['id' => $a->id, 'name' => $a->name])
        ]);
    }

    /**
     * Get all audiences of article
     * GET /api/eloquent/article-audiences
     */
    public function articleAudiences()
    {
        $article = Article::where('name', 'Climate changes in the last 3 years')->first();
        
        if (!$article) {
            return response()->json(['status' => 'error', 'message' => 'Article not found'], 404);
        }

        $audiences = $article->audiences()->with('user')->get();
        
        return response()->json([
            'status' => 'success',
            'article' => $article->name,
            'audiences' => $audiences->map(fn($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'user' => $a->user->name
            ])
        ]);
    }

    /**
     * Get all audiences of author (using hasManyThrough)
     * GET /api/eloquent/author-audiences
     */
    public function authorAudiences()
    {
        $author = Author::where('name', 'like', '%Sok%')->first();
        
        if (!$author) {
            return response()->json(['status' => 'error', 'message' => 'Author not found'], 404);
        }

        $audiences = $author->audiences()->get();
        
        return response()->json([
            'status' => 'success',
            'author' => $author->name,
            'audiences' => $audiences->map(fn($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'article' => $a->article->name,
                'user' => $a->user->name
            ])
        ]);
    }

    /**
     * Get all comments of audience
     * GET /api/eloquent/audience-comments
     */
    public function audienceComments()
    {
        $audience = Audience::whereHas('user', function($q) {
            $q->where('name', 'Samnang');
        })->first();
        
        if (!$audience) {
            return response()->json(['status' => 'error', 'message' => 'Audience not found'], 404);
        }

        $comments = $audience->comments()->with('user')->get();
        
        return response()->json([
            'status' => 'success',
            'audience' => $audience->name,
            'user' => $audience->user->name,
            'comments' => $comments->map(fn($c) => [
                'id' => $c->id,
                'text' => $c->name,
                'by_user' => $c->user->name
            ])
        ]);
    }

    /**
     * Get all comments with commentable type
     * GET /api/eloquent/all-comments
     */
    public function allComments()
    {
        $comments = Comment::with(['user', 'commentable'])->get();
        
        $result = $comments->map(function($comment) {
            $commentableType = class_basename($comment->commentable_type);
            return [
                'id' => $comment->id,
                'text' => $comment->name,
                'by_user' => $comment->user->name,
                'on_type' => $commentableType,
                'on_item' => $comment->commentable->name ?? 'Unknown'
            ];
        });
        
        return response()->json(['status' => 'success', 'data' => $result]);
    }
}

