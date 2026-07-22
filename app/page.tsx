import Container from "@/components/layout/container";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BlogSearch } from "@/components/blog/blog-search";
import { Separator } from "@/components/ui/separator";

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

  return (
    <section className="py-12 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-16 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Innate<span className="italic text-amber-700">Void</span>
                </h1>
                <p className="text-muted-foreground text-lg font-light max-w-lg leading-relaxed">
                  Deep dives into computing, systems architecture, and the art of structured learning.
                </p>
              </div>
              <BlogSearch />
            </div>
            <Separator className="bg-border/50" />
          </header>

          {/* Posts List */}
          <div className="grid gap-16">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block"
                >
                  <article className="grid md:grid-cols-[1fr_2fr] gap-8 items-start transition-all duration-300">
                    {/* Metadata column */}
                    <div className="flex flex-col gap-2 pt-1.5">
                      <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                        <span className="text-primary">{post.tag}</span>
                        <span className="h-px w-6 bg-border" />
                      </div>
                      <time className="text-sm text-muted-foreground/60 font-medium">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Content column */}
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed font-light text-[17px] line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                        {post.excerpt}
                      </p>

                      <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                        Read full insight
                        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="py-24 text-center space-y-4 border-2 border-dashed rounded-2xl border-muted">
                <p className="text-xl text-muted-foreground">No insights found matching your search.</p>
                <Link href="/" className="text-primary font-medium hover:underline">
                  Clear all filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
