import { Button } from '@/components/ui/button';
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

                    <div className="post-form">

                        <form action="">
                            
                        </form>
                    </div>
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
