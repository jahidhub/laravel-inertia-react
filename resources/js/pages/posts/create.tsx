import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, Link } from '@inertiajs/react';

export default function Posts() {
    return (
        <>
            <Head title="Create Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <div className="text-xl">Create Posts</div>
                        <Button>
                            <Link href="/posts">Go Back</Link>
                        </Button>
                    </div>

                    <Card className="post-form">
                        <CardContent>
                            <form action="">
                                <div className='mb-4'>
                                    <label htmlFor="title">Title</label>
                                    <Input
                                        type="text"
                                        placeholder="title"
                                        id="title"
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="title">Title</label>
                                    <Input
                                        type="text"
                                        placeholder="title"
                                        id="title"
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Posts.layout = {
    breadcrumbs: [
        {
            title: 'Create Posts',
            href: '/posts/create',
        },
    ],
};
