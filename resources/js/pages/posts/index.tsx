import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Posts() {
    return (
        <>
            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <InputGroup className="max-w-md">
                            <InputGroupInput placeholder="Search..." />

                            <InputGroupAddon>
                                <Search className="h-4 w-4" />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button type="button">Create Post</Button>
                    </div>

                    <div className="post-form">
                        <Card>
                            <CardContent>
                                <Table>
                                    
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                No
                                            </TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Content</TableHead>
                                            <TableHead className="text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                1
                                            </TableCell>
                                            <TableCell>image</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>slug</TableCell>
                                            <TableCell>Content</TableCell>
                                            <TableCell className="text-right">
                                               action
                                            </TableCell>
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
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
