import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import debounce from 'lodash/debounce';
import InertiaPagination from '@/components/ui/InertiaPagination';

interface PostType {
    id: number;
    post_title: string;
    post_slug: string;
    post_content: string;
    post_category: string;
    post_status: string;
    post_image: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedPosts {
    data: PostType[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    per_page: number;
}

export default function Posts({ posts }: { posts: PaginatedPosts }) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, { id: flash.success });
        }
    }, [flash.success]);

    const { filters = {} } = usePage<{ filters: { search?: string } }>().props;

    const handleSearch = useRef(
        debounce((query: string) => {
            router.get(
                '/posts',
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

    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleSearch(e.target.value);
    }

    return (
        <>
            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <InputGroup className="max-w-md">
                            <InputGroupInput
                                placeholder="Search..."
                                onChange={onSearchChange}
                                defaultValue={filters.search}
                            />

                            <InputGroupAddon>
                                <Search className="h-4 w-4" />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button>
                            <Link href="/posts/create">Create Post</Link>
                        </Button>
                    </div>

                    <div className="post-form">
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-15">
                                                No
                                            </TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Content</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {posts.data?.map((post, index) => (
                                            <TableRow key={post.id}>
                                                <TableCell className="font-medium">
                                                    {(posts.current_page - 1) *
                                                        posts.per_page +
                                                        index +
                                                        1}
                                                </TableCell>
                                                <TableCell>
                                                    <img
                                                        src={`/storage/${post.post_image}`}
                                                        alt={post.post_title}
                                                        className="h-15 w-15 rounded-md object-cover"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <p className="line-clamp-2 w-[200px]">
                                                        {post.post_title}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="line-clamp-2 w-[200px]">
                                                        {post.post_slug}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="line-clamp-2 w-[250px]">
                                                        {post.post_content}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="line-clamp-2 w-[150px]">
                                                        {post.post_category}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`${
                                                            post.post_status ===
                                                            'Active'
                                                                ? 'bg-green-500'
                                                                : 'bg-red-500'
                                                        }`}
                                                    >
                                                        {post.post_status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2 text-right">
                                                    <Button variant="outline">
                                                        <Link
                                                            href={`/posts/${post.id}/edit`}
                                                            preserveScroll
                                                            preserveState
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="text-red-500 hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Link
                                                            method="delete"
                                                            href={`/posts/${post.id}`}
                                                            onBefore={() => confirm('Are you sure you want to delete this post?')}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {posts.data.length === 0 && (
                                    <div className="flex items-center justify-center">
                                        <p className="py-20 text-muted-foreground">
                                            No posts found
                                        </p>
                                    </div>
                                )}

                                <InertiaPagination
                                    pagination={posts}
                                    className="py-5"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Posts.layout = {
    breadcrumbs: [
        {
            title: 'Posts',
            href: '/posts',
        },
    ],
};
