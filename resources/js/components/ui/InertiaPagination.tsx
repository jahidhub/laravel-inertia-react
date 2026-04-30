import { router, Link } from '@inertiajs/react'
import { Button } from './button';

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination {
    data: any[];
    links: PaginationLinks[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    per_page: number;
}

export default function InertiaPagination({ pagination, className }: { pagination: Pagination, className?: string }) {
    return (
        <div className={`flex items-center justify-between ${className || ''}`}>
            <div className="text-sm text-muted-foreground">
                Showing {pagination.from} to {pagination.to} of {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">



                {pagination.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`rounded-md border px-3 py-1 text-sm ${link.active
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                            } ${!link.url
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
    )
}
