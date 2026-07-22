import Container from "@/components/layout/container";
import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30 py-12 md:py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2 space-y-4">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
                        >
                            Insights<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground font-light leading-relaxed max-w-sm">
                            A collection of structured insights on engineering, systems architecture, and the pursuit of mastery in the digital age.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="https://x.com/Priyans35353551" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.youtube.com/@innatevoid22" className="text-muted-foreground hover:text-primary transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Insights</Link>
                            </li>
                            <li>
                                <Link href="/blogs/create" className="hover:text-primary transition-colors">Draft</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Documentation</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest">Connect</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Newsletter</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Insights. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
