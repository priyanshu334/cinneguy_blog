'use client'

import Container from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Rocket, FileText, Layout, Type } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { name: "Foundations", color: "text-blue-500 bg-blue-500/10" },
    { name: "Systems", color: "text-emerald-500 bg-emerald-500/10" },
    { name: "Networking", color: "text-amber-500 bg-amber-500/10" },
    { name: "AI", color: "text-purple-500 bg-purple-500/10" },
];

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Foundations");
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        if (!title || !slug || !content) {
            toast.error("Required fields missing", {
                description: "Please provide a title, slug, and content."
            });
            return;
        }

        setLoading(true);
        const supabase = createClient();

        const { error } = await supabase.from("posts").insert([
            {
                title,
                slug,
                excerpt,
                content,
                category,
                published: true,
            }
        ]);

        if (error) {
            toast.error("Publication failed", {
                description: error.message
            });
            setLoading(false);
            return;
        }

        toast.success("Insight published!", {
            description: "Your structured thinking is now live."
        });

        router.push(`/blogs/${slug}`);
        router.refresh();
    };

    return (
        <section className="py-12 md:py-24 animate-in">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Top Actions */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to dashboard
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Form Side */}
                        <div className="flex-1 space-y-8">
                            <header className="space-y-2">
                                <h1 className="text-4xl font-bold tracking-tight">Draft Insight</h1>
                                <p className="text-muted-foreground font-light text-lg">
                                    Structure your thoughts on computing and systems.
                                </p>
                            </header>

                            <div className="space-y-6">
                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Layout className="h-4 w-4" /> Category
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.name}
                                                onClick={() => setCategory(cat.name)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                                    category === cat.name
                                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                                        : "bg-muted/50 text-muted-foreground border-transparent hover:border-muted-foreground/20"
                                                )}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="opacity-50" />

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <Type className="h-4 w-4" /> Title
                                            </label>
                                            <Input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Why Foundations Matter..."
                                                className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 h-12 text-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                Slug
                                            </label>
                                            <Input
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="why-foundations-matter"
                                                className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 h-12 font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            Excerpt
                                        </label>
                                        <Textarea
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            placeholder="A brief overview of your insight..."
                                            className="min-h-[100px] bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 resize-none text-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> Content (Markdown)
                                        </label>
                                        <Textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Dive deep into the topic..."
                                            className="min-h-[400px] bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 resize-none font-mono text-base leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className="w-full md:w-80 space-y-6 md:sticky md:top-32">
                            <Card className="bg-linear-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="inline-flex items-center gap-2">
                                        Ready to publish?
                                    </CardTitle>
                                    <CardDescription>
                                        Ensure your draft is polished before going live.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button
                                        onClick={handlePublish}
                                        disabled={loading}
                                        className="w-full shadow-xl shadow-primary/20 py-6 text-lg font-bold"
                                    >
                                        {loading ? "Publishing..." : (
                                            <>
                                                <Rocket className="mr-2 h-5 w-5" /> Publish
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-[11px] text-muted-foreground text-center">
                                        By publishing, you agree to share this insight with the world.
                                    </p>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-2xl bg-muted/20 border border-border/50">
                                <h4 className="text-sm font-bold mb-3 uppercase tracking-widest text-muted-foreground">Writing Tips</h4>
                                <ul className="text-xs space-y-3 text-muted-foreground leading-relaxed">
                                    <li>• Use H2 and H3 for logical structure.</li>
                                    <li>• Keep excerpts concise and engaging.</li>
                                    <li>• Tag accurately to help readers find you.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
