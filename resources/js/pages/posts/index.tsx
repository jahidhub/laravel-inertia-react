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
                                                    {(posts.current_page - 1) * posts.per_page + index + 1}
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
                                                            href={`/posts/${post.id}`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="text-red-500 hover:border-2 hover:border-red-500 hover:bg-red-500 hover:text-red-500"
                                                    >
                                                        <Link
                                                            href={`/posts/${post.id}`}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {posts.links && posts.links.length > 3 && (
                                    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                        <div className="text-sm text-gray-500">
                                            Showing {posts.from || 0} to {posts.to || 0} of {posts.total} results
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1">
                                            {posts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`rounded-md border px-3 py-1 text-sm ${
                                                        link.active
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-muted'
                                                    } ${
                                                        !link.url
                                                            ? 'pointer-events-none opacity-50'
                                                            : ''
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    preserveScroll
                                                    preserveState
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
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
