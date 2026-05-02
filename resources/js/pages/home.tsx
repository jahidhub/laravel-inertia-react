import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    ArrowRight, 
    BookOpen, 
    Rocket, 
    Zap, 
    Shield, 
    Code,
    Send
} from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

export default function Home({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Head title="Home" />

            {/* Extracted Header Component */}
            <PublicHeader canRegister={canRegister} />

            <main className="flex-1">
                {/* Hero Banner Section */}
                <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
                    {/* Background Gradients */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute -top-24 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                        <div className="absolute top-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 text-sm font-medium">
                            <Rocket className="w-4 h-4" />
                            <span>Discover the ultimate platform</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
                            Build faster with <br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary/80">
                                Modern Web Tech
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            A powerful, elegant, and blazing-fast boilerplate for your next big idea. Beautifully designed and perfectly structured.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                                <Link href="/register">
                                    Start Building Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all hover:-translate-y-1">
                                <Link href="/blog">
                                    <BookOpen className="mr-2 w-5 h-5" />
                                    Read our Blog
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Section 1: Features */}
                <section className="py-24 bg-muted/30 border-y border-border/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything you need to succeed</h2>
                            <p className="text-lg text-muted-foreground">
                                We've carefully curated the best tools in the ecosystem to give you a developer experience like no other.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                        <Zap className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Powered by Inertia.js and React, enjoy the speed of an SPA with the simplicity of a classic monolith.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                                        <Shield className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Secure by Default</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Laravel's robust security features keep your application safe from SQL injection, CSRF, and XSS.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
                                <CardContent className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
                                        <Code className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Beautiful UI</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Crafted with Tailwind CSS and carefully designed components that look amazing out of the box.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Section 2: Contact Form */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-lg text-muted-foreground">
                                Have any questions or want to work together? Send us a message and we'll get back to you soon.
                            </p>
                        </div>

                        <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-8 md:p-12">
                                <form className="space-y-6" onSubmit={(e) => {
                                    e.preventDefault();
                                    alert('Message sent successfully! (This is a demo)');
                                }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                                            <Input id="name" placeholder="John Doe" required className="bg-background/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                                            <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                        <Input id="subject" placeholder="How can we help you?" required className="bg-background/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea 
                                            id="message" 
                                            placeholder="Write your message here..." 
                                            rows={5} 
                                            required 
                                            className="bg-background/50 resize-none" 
                                        />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full">
                                        <Send className="mr-2 w-4 h-4" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            {/* Extracted Footer Component */}
            <PublicFooter />
        </div>
    );
}
