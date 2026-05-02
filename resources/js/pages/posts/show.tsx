import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Folder, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function ShowPost({ post }: { post: PostType }) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <Head title={post.post_title} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4 md:p-6 lg:p-8 bg-background/50">
                <div className="mx-auto w-full max-w-4xl space-y-8">
                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" className="hover:bg-muted/50 transition-colors" asChild>
                            <Link href="/posts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Posts
                            </Link>
                        </Button>
                        
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={`/posts/${post.id}/edit`}>Edit Post</Link>
                            </Button>
                        </div>
                    </div>

                    <Card className="overflow-hidden border border-border/50 shadow-xl bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        {/* Hero Section with Image */}
                        {post.post_image ? (
                            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full group">
                                <img
                                    src={`/storage/${post.post_image}`}
                                    alt={post.post_title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12 text-white">
                                    <div className="mb-4 flex flex-wrap items-center gap-3">
                                        <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-3 py-1">
                                            <Folder className="mr-1.5 h-3.5 w-3.5" />
                                            {post.post_category}
                                        </Badge>
                                        <Badge className={`${post.post_status === 'Active' ? 'bg-emerald-500/80 hover:bg-emerald-500' : 'bg-rose-500/80 hover:bg-rose-500'} backdrop-blur-md border-none text-white px-3 py-1 transition-colors`}>
                                            {post.post_status}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg">
                                        {post.post_title}
                                    </h1>
                                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
                                        <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            <Calendar className="h-4 w-4 text-primary-foreground/80" />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Hero Section without Image */
                            <div className="relative border-b border-border/50 bg-gradient-to-br from-muted/50 via-background to-muted/30 p-8 sm:p-12 md:p-16">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Clock className="w-64 h-64" />
                                </div>
                                <div className="relative z-10">
                                    <div className="mb-6 flex flex-wrap items-center gap-3">
                                        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-3 py-1">
                                            <Folder className="mr-1.5 h-3.5 w-3.5" />
                                            {post.post_category}
                                        </Badge>
                                        <Badge className={`${post.post_status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'} text-white px-3 py-1 shadow-sm transition-colors`}>
                                            {post.post_status}
                                        </Badge>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                        {post.post_title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                                        <div className="flex items-center gap-2 bg-background shadow-sm border border-border/50 px-3 py-1.5 rounded-full">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content Section */}
                        <CardContent className="p-8 sm:p-12 md:p-16 bg-card">
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
                                {post.post_content.split('\n').map((paragraph, index) => {
                                    if (!paragraph.trim()) return <br key={index} />;
                                    return (
                                        <p key={index} className="mb-6 text-lg leading-relaxed text-foreground/80 font-medium">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ShowPost.layout = {
    breadcrumbs: [
        {
            title: 'Posts',
            href: '/posts',
        },
        {
            title: 'Show',
        },
    ],
};
