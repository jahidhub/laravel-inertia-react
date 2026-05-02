import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Folder, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function BlogShow({ post }: { post: PostType }) {
    const { auth } = usePage<{ auth: { user: any } }>().props;

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Head title={post.post_title} />
            
            {/* Header */}
            <PublicHeader />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mx-auto w-full space-y-8">
                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" className="hover:bg-muted/50 transition-colors -ml-4" asChild>
                            <Link href="/blog">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog
                            </Link>
                        </Button>
                        
                        <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: post.post_title,
                                    url: window.location.href
                                })
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copied to clipboard!");
                            }
                        }}>
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                    </div>

                    <article className="overflow-hidden rounded-2xl border border-border/50 shadow-xl bg-card/80 backdrop-blur-sm transition-all duration-300">
                        {/* Hero Section with Image */}
                        {post.post_image ? (
                            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
                                <img
                                    src={`/storage/${post.post_image}`}
                                    alt={post.post_title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-16 text-white">
                                    <div className="mb-4 flex flex-wrap items-center gap-3">
                                        <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-3 py-1">
                                            <Folder className="mr-1.5 h-3.5 w-3.5" />
                                            {post.post_category}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg mb-6">
                                        {post.post_title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
                                        <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                            <Calendar className="h-4 w-4 text-primary-foreground/80" />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Hero Section without Image */
                            <div className="relative border-b border-border/50 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 sm:p-12 md:p-16 lg:p-20">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Clock className="w-64 h-64" />
                                </div>
                                <div className="relative z-10 max-w-3xl">
                                    <div className="mb-6 flex flex-wrap items-center gap-3">
                                        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-3 py-1">
                                            <Folder className="mr-1.5 h-3.5 w-3.5" />
                                            {post.post_category}
                                        </Badge>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 leading-tight">
                                        {post.post_title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                                        <div className="flex items-center gap-2 bg-background shadow-sm border border-border/50 px-4 py-2 rounded-full">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="p-8 sm:p-12 md:p-16 lg:p-20 bg-card">
                            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
                                {post.post_content.split('\n').map((paragraph, index) => {
                                    if (!paragraph.trim()) return <br key={index} />;
                                    return (
                                        <p key={index} className="mb-6 text-xl leading-relaxed text-foreground/80 font-medium">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            
            {/* Footer */}
            <PublicFooter />
        </div>
    );
}
