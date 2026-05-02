import { Link } from '@inertiajs/react';
import { Globe } from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer className="bg-muted/40 border-t border-border/50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-lg font-bold">LaravelApp</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} LaravelApp. Built with Laravel, React & Inertia.
                </p>
                <div className="flex gap-6 text-sm font-medium">
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                    <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                    <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">Register</Link>
                </div>
            </div>
        </footer>
    );
}
