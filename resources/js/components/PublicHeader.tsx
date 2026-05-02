import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function PublicHeader({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<{ auth: { user: any } }>().props;

    return (
        <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 hover:opacity-80 transition-opacity">
                            LaravelApp
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-semibold text-primary">
                            Home
                        </Link>
                        <Link href="/blog" className="text-sm font-semibold hover:text-primary transition-colors">
                            Blog
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {auth?.user ? (
                            <Button asChild variant="default" className="rounded-full px-6">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost" className="rounded-full hidden sm:inline-flex">
                                    <Link href="/login">Log in</Link>
                                </Button>
                                {canRegister && (
                                    <Button asChild variant="default" className="rounded-full px-6">
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
