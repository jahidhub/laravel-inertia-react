import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';


export default function Posts() {
    const { data, setData, errors, post, processing } = useForm<{
        title: string;
        slug: string;
        content: string;
        category: string;
        status: string;
        image: File | null;
    }>({
        title: '',
        slug: '',
        content: '',
        category: '',
        status: '',
        image: null,
    });
    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/posts');
    }



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
                            <form
                                onSubmit={handleSubmitForm}
                                className="space-y-6 rounded-xl border p-6 shadow-sm"
                            >
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="title"
                                            className="text-sm leading-none font-medium"
                                        >
                                            Title
                                        </label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            aria-invalid={!!errors.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                            placeholder="Enter post title"
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="slug"
                                            className="text-sm leading-none font-medium"
                                        >
                                            Slug
                                        </label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) =>
                                                setData('slug', e.target.value)
                                            }
                                            type="text"
                                            placeholder="Enter post slug"
                                            aria-invalid={!!errors.slug}
                                        />
                                        <InputError message={errors.slug} />
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="category"
                                            className="text-sm leading-none font-medium"
                                        >
                                            Category
                                        </label>
                                        <Select
                                            value={data.category}
                                            onValueChange={(e) =>
                                                setData('category', e)
                                            }
                                        >
                                            <SelectTrigger
                                                id="category"
                                                aria-invalid={!!errors.category}
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="News">
                                                        News
                                                    </SelectItem>
                                                    <SelectItem value="Sport">
                                                        Sport
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="status"
                                            className="text-sm leading-none font-medium"
                                        >
                                            Status
                                        </label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(e) =>
                                                setData('status', e)
                                            }
                                        >
                                            <SelectTrigger
                                                id="status"
                                                className="w-full"
                                                aria-invalid={!!errors.status}
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Active">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="Inactive">
                                                        Inactive
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="content"
                                        className="text-sm leading-none font-medium"
                                    >
                                        Content
                                    </label>
                                    <Textarea
                                        id="content"
                                        aria-invalid={!!errors.content}
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        rows={6}
                                        placeholder="Write your post content here..."
                                    />
                                    <InputError message={errors.content} />
                                </div>

                                <div className="space-y-2">
                                    <Field>
                                        <FieldLabel htmlFor="image">
                                            Image
                                        </FieldLabel>
                                        <Input
                                            id="image"
                                            aria-invalid={!!errors.image}
                                            type="file"
                                            onChange={(e) => {
                                                const files =
                                                    e.target.files?.[0];

                                                if (files) {
                                                    setData('image', files);
                                                }
                                            }}
                                        />
                                        <InputError message={errors.image} />
                                    </Field>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        disabled={processing}
                                        type="submit"
                                        className="px-6"
                                    >
                                        {processing && (
                                            <Loader2 className="animate-spin" />
                                        )}
                                        <span>Submit</span>
                                    </Button>

                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
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
