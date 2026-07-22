import Container from "@/components/layout/container";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BlogSearch } from "@/components/blog/blog-search";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar, Film, Clapperboard, Sparkles } from "lucide-react";

interface SearchParams {
  search?: string;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { search } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data: posts } = await query;

  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts && posts.length > 1 ? posts.slice(1) : [];

  return (
    <section className="py-12 md:py-20 bg-background text-foreground selection:bg-amber-500 selection:text-black">
      <Container>
        <div className="max-w-5xl mx-auto space-y-14">

          {/* Header Section */}
          <header className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest border border-amber-500/20">
                  <Film className="w-3.5 h-3.5" />
                  Film Analysis & Cinema Universe
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight font-serif italic">
                  Innate<span className="not-italic text-amber-600 dark:text-amber-500">Void</span>
                </h1>

                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed font-light">
                  Deep dives into film theory, ending explanations, hidden details, and visual storytelling.
                </p>
              </div>

              <div className="w-full md:w-80">
                <BlogSearch />
              </div>
            </div>
            <Separator className="bg-border/60" />
          </header>

          {/* Empty Search State */}
          {(!posts || posts.length === 0) && (
            <div className="py-24 text-center space-y-4 border border-dashed rounded-2xl bg-card/30 border-muted">
              <Clapperboard className="w-10 h-10 mx-auto text-muted-foreground/60" />
              <p className="text-lg text-muted-foreground font-medium">
                No cinematic insights found matching your search.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center text-sm text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                Clear all filters →
              </Link>
            </div>
          )}

          {/* Featured Essay / Main Spotlight */}
          {featuredPost && (
            <section className="group relative rounded-2xl border bg-card/40 p-6 md:p-10 transition-all duration-300 hover:bg-card hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5">
              <Link href={`/blogs/${featuredPost.slug}`} className="block space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 rounded-md tracking-widest font-mono">
                      {featuredPost.tag || "FEATURED ESSAY"}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-muted-foreground/80">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-medium tracking-normal">
                    Featured Analysis
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between gap-4">
                    <span>{featuredPost.title}</span>
                    <ArrowUpRight className="w-7 h-7 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-amber-600 dark:text-amber-400 shrink-0 hidden md:block" />
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg line-clamp-3 font-light">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  <span>Read full breakdown</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </Link>
            </section>
          )}

          {/* Standard Blog Feed / Recent Breakdown List */}
          {remainingPosts.length > 0 && (
            <div className="space-y-8 pt-4">
              <div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase font-mono">
                <span>Recent Analyses & Theories</span>
                <span className="h-px flex-1 bg-border/60" />
              </div>

              <div className="divide-y divide-border/60">
                {remainingPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group block py-8 first:pt-0 last:pb-0"
                  >
                    <article className="grid md:grid-cols-[1fr_2.5fr] gap-6 items-start">
                      {/* Left Metadata Column */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-600 dark:text-amber-400 font-semibold">
                            {post.tag || "FILM THEORY"}
                          </span>
                        </div>
                        <time className="block text-xs text-muted-foreground/70 font-medium">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>

                      {/* Right Content Column */}
                      <div className="space-y-2.5">
                        <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between gap-4">
                          <span>{post.title}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-600 dark:text-amber-400 shrink-0" />
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-light line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="pt-1 text-xs font-semibold text-amber-600/80 dark:text-amber-400/80 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-1">
                          <span>Explore scene details</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
