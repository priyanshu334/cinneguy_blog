import Container from "@/components/layout/container";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30 py-12 md:py-16 text-foreground">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand & Ecosystem Mission Column */}
                    <div className="md:col-span-2 space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-2xl font-serif font-bold tracking-tight hover:opacity-90 transition-opacity"
                        >
                            <span>Innate<span className="text-amber-600 dark:text-amber-500 italic">Void</span></span>
                        </Link>
                        
                        <p className="text-muted-foreground font-light leading-relaxed max-w-sm text-sm">
                            Deep dives into cinema theory, ending breakdowns, hidden details, and structured film analysis.
                        </p>

                        {/* Social Links with Icons */}
                        <div className="flex items-center gap-4 pt-2">
                            <Link 
                                href="https://www.youtube.com/@innatevoid22" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="YouTube Channel"
                                className="p-2 rounded-md border border-border/50 text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 transition-all"
                            >
                            </Link>
                            
                            <Link 
                                href="https://x.com/Priyans35353551" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="X / Twitter"
                                className="p-2 rounded-md border border-border/50 text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 transition-all"
                            >                            </Link>

                            <Link 
                                href="#" 
                                aria-label="GitHub Repository"
                                className="p-2 rounded-md border border-border/50 text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 transition-all"
                            >
                            </Link>
                        </div>
                    </div>

                    {/* Navigation: Cinema Pillars */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
                            Ecosystem
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground font-medium">
                            <li>
                                <Link href="/blogs" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    Film Essays
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs?tag=Ending+Explained" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    Endings Explained
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs?tag=Film+Theory" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    Theories & Details
                                </Link>
                            </li>
                            <li>
                                <Link href="/quiz" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    Trivia & Quizzes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community & Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
                            Connect
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground font-medium">
                            <li>
                                <Link href="/newsletter" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    Newsletter Dispatch
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/@innatevoid22" target="_blank" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    YouTube Hub
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                    About the Channel
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono tracking-wider">
                    <p>© {new Date().getFullYear()} InnateVoid Universe. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}