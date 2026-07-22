'use client'

import Container from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clapperboard, Film, Layout, Type, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Film Content Pillars from the Brand Roadmap
const CINEMA_CATEGORIES = [
    { name: "Ending Explained", tag: "ENDING EXPLAINED" },
    { name: "Film Theory", tag: "FILM THEORY" },
    { name: "Hidden Details", tag: "HIDDEN DETAILS" },
    { name: "Character Analysis", tag: "CHARACTER STUDY" },
    { name: "What-If Theories", tag: "WHAT-IF" },
];

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Ending Explained");
    const [loading, setLoading] = useState(false);

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        const generatedSlug = val
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
        setSlug(generatedSlug);
    };

const handlePublish = async () => {
    if (!title || !slug || !content) {
        toast.error("Required fields missing", {
            description: "Please provide an essay title, slug, and content body."
        });
        return;
    }

    setLoading(true);
    const supabase = createClient();

    const selectedCat = CINEMA_CATEGORIES.find((c) => c.name === category);

    // Save selectedCat?.tag directly into the category column
    const { error } = await supabase.from("posts").insert([
        {
            title,
            slug,
            excerpt,
            content,
            category: selectedCat?.tag || "FILM ESSAY", // Uses existing 'category' column!
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

    toast.success("Film essay published!", {
        description: "Your cinematic analysis is now live."
    });

    router.push(`/blogs/${slug}`);
    router.refresh();
};
    return (
        <section className="py-12 md:py-20 animate-in text-foreground">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Film Essays
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Main Editor Side */}
                        <div className="flex-1 space-y-8 w-full">
                            <header className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono tracking-widest uppercase border border-amber-500/20">
                                    <Clapperboard className="w-3.5 h-3.5" />
                                    Draft Cinema Essay
                                </div>
                                <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
                                    New Analysis
                                </h1>
                                <p className="text-muted-foreground font-light text-base">
                                    Deconstruct movie themes, ending lore, and hidden motifs.
                                </p>
                            </header>

                            <div className="space-y-6">
                                {/* Category/Pillar Selection */}
                                <div className="space-y-3">
                                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Layout className="h-4 w-4 text-amber-600 dark:text-amber-500" /> Content Pillar
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {CINEMA_CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.name}
                                                type="button"
                                                onClick={() => setCategory(cat.name)}
                                                className={cn(
                                                    "px-3.5 py-1.5 rounded-md text-xs font-mono transition-all border",
                                                    category === cat.name
                                                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 font-bold shadow-xs"
                                                        : "bg-muted/30 text-muted-foreground border-transparent hover:border-border"
                                                )}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="opacity-50" />

                                <div className="space-y-6">
                                    {/* Title & Slug */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <Type className="h-4 w-4 text-amber-600 dark:text-amber-500" /> Essay Title
                                            </label>
                                            <Input
                                                value={title}
                                                onChange={handleTitleChange}
                                                placeholder="e.g. Interstellar Ending Explained..."
                                                className="bg-muted/30 border-border/60 focus-visible:ring-amber-500/50 h-12 text-base font-serif"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                                                URL Slug
                                            </label>
                                            <Input
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="interstellar-ending-explained"
                                                className="bg-muted/30 border-border/60 focus-visible:ring-amber-500/50 h-12 font-mono text-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                                            Hook / Excerpt
                                        </label>
                                        <Textarea
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            placeholder="The curiosity gap hook that introduces the film thesis..."
                                            className="min-h-[90px] bg-muted/30 border-border/60 focus-visible:ring-amber-500/50 resize-none text-sm font-sans leading-relaxed"
                                        />
                                    </div>

                                    {/* Content (Markdown) */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                            <Film className="h-4 w-4 text-amber-600 dark:text-amber-500" /> Breakdown Body (Markdown)
                                        </label>
                                        <Textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="## The Setup&#10;Analyze scene by scene..."
                                            className="min-h-[420px] bg-muted/30 border-border/60 focus-visible:ring-amber-500/50 resize-none font-sans text-base leading-relaxed p-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Publish Action & Film Writing Tips */}
                        <div className="w-full md:w-80 space-y-6 md:sticky md:top-28">
                            <Card className="bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/20 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="font-serif text-lg flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                        Ready to Publish?
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Double check your movie details, character names, and spoiler warnings.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button
                                        onClick={handlePublish}
                                        disabled={loading}
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black py-6 text-base font-serif font-bold shadow-lg shadow-amber-500/10"
                                    >
                                        {loading ? "Publishing Essay..." : "Publish Analysis"}
                                    </Button>
                                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                                        Post will immediately sync across the InnateVoid ecosystem.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Film Writing Tips */}
                            <div className="p-6 rounded-2xl bg-muted/20 border border-border/50 space-y-3">
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                                    Cinema Essay Checklist
                                </h4>
                                <ul className="text-xs space-y-2.5 text-muted-foreground leading-relaxed font-light">
                                    <li>• <strong className="font-medium text-foreground">3-Act Hook:</strong> Hook readers in the first 2 sentences.</li>
                                    <li>• <strong className="font-medium text-foreground">Specifics:</strong> Mention key director choices or timestamp details.</li>
                                    <li>• <strong className="font-medium text-foreground">Formatting:</strong> Use H2/H3 headings for easy scanning.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}