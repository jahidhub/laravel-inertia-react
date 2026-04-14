import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head } from '@inertiajs/react';
Posts.layout = {
    breadcrumbs: [
        {
            title: 'Posts',
            href: '/posts',
        },
    ],
};

export default function Posts() {
    return (
        <>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <Input placeholder="Enter text" className="w-1/3" />
                        <Button type="button">Create Post</Button>
                    </div>

                    <div className="post-form">
                        

                    </div>
                </div>
            </div>
        </>
    );
}
