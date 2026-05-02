import { Head, Link, usePage, router } from '@inertiajs/react';
import { Search, Calendar, Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import InertiaPagination from '@/components/ui/InertiaPagination';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

interface PostType {
    id: number;
    post_title: string;
    post_slug: string;
    post_content: string;
    post_category: string;
    post_status: string;
    post_image: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginatedPosts {
    data: PostType[];
    links: any[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    per_page: number;
}

export default function BlogIndex({ posts, filters }: { posts: PaginatedPosts; filters: { search?: string } }) {
    const { auth } = usePage<{ auth: { user: any } }>().props;

    const handleSearch = useRef(
        debounce((query: string) => {
            router.get(
                '/blog',
                { search: query },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 500),
    ).current;

    useEffect(() => {
        return () => {
            handleSearch.cancel();
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Head title="Our Blog" />
            
            {/* Header */}
            <PublicHeader />

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
                        Latest Insights & Stories
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the latest news, tutorials, and perspectives from our team.
                    </p>
                </div>

                <div className="mb-10 max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        defaultValue={filters?.search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 h-12 text-lg rounded-full bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary shadow-sm"
                    />
                </div>

                {posts.data.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No posts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post) => (
                            <Link key={post.id} href={`/blog/${post.post_slug}`} className="group h-full">
                                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 flex flex-col bg-card/50 backdrop-blur-sm">
                                    {post.post_image ? (
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={`/storage/${post.post_image}`}
                                                alt={post.post_title}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative h-56 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center border-b border-border/50">
                                            <Folder className="h-16 w-16 text-primary/20" />
                                        </div>
                                    )}
                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
                                                {post.post_category}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.post_title}
                                        </h2>
                                        <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                                            {post.post_content}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            Read more →
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-12 flex justify-center">
                    <InertiaPagination pagination={posts} />
                </div>
            </main>

            {/* Footer */}
            <PublicFooter />
        </div>
    );
}
