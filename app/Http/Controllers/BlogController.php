<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::where('post_status', 'Active')->latest();

        if ($request->has('search') && $request->search !== null) {
            $query->where(function ($q) use ($request) {
                $q->where('post_title', 'like', '%' . $request->search . '%')
                  ->orWhere('post_content', 'like', '%' . $request->search . '%');
            });
        }

        $posts = $query->paginate(6)->withQueryString();

        return Inertia::render('blog/index', [
            'posts' => $posts->toArray(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('post_slug', $slug)
            ->where('post_status', 'Active')
            ->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post
        ]);
    }
}
