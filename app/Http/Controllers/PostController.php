<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Auth::user()->posts()->latest();

        if ($request->has('search') && $request->search !== null) {
            $query->whereAny(['post_title', 'post_content'], 'like', '%' . $request->search . '%');
        }

        $posts = $query->paginate(2)->withQueryString();
        // dd($posts->toArray());
        return Inertia::render('posts/index', [
            'posts' => $posts->toArray(),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => ['required', 'string', 'max:255'],

            'slug' => ['required', 'string', 'max:255', 'unique:posts,post_slug'],

            'content' => ['required', 'string'],

            'category' => ['required'],

            'status' => ['required'],

            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5000'],
        ]);

        $image = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $image = $file->store('posts', 'public');
        }

        Post::create([
            'user_id' => Auth::user()->id,
            'post_title' => $request->input('title'),
            'post_slug' => $request->slug ? Str::slug($request->slug) : Str::slug($request->title),
            'post_content' => $request->input('content'),
            'post_category' => $request->input('category'),
            'post_status' => $request->input('status'),
            'post_image' => $image,
        ]);

        return to_route('posts.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {

        return inertia::render('posts/edit', [
            'postData' => $post->toArray(),
            'id' => $post->id
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        $request->validate([
            'title' => ['required', 'string', 'max:255'],

            'slug' => 'required|string|max:255|unique:posts,post_slug,'. $post->id,

            'content' => ['required', 'string'],

            'category' => ['required'],

            'status' => ['required'],

            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5000'],
        ]);

        $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        $updateData = [
            'post_title' => $request->input('title'),
            'post_slug' => $slug,
            'post_content' => $request->input('content'),
            'post_category' => $request->input('category'),
            'post_status' => $request->input('status'),
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $image = $file->store('posts', 'public');
            
            if ($post->post_image && Storage::disk('public')->exists($post->post_image)) {
                Storage::disk('public')->delete($post->post_image);
            }
            
            $updateData['post_image'] = $image;
        }

        $post->fill($updateData)->save();

        return to_route('posts.index')->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        
        if ($post->post_image && Storage::disk('public')->exists($post->post_image)) {
            Storage::disk('public')->delete($post->post_image);
        }
        $post->deleteQuietly();
        return to_route('posts.index')->with('success', 'Post deleted successfully');
    }
}
