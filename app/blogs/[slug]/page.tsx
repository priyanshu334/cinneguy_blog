import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getPost(slug: string) {
  const supabase = await createClient();
  console.log(slug);

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  return post;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  async function HandleDelete(){
    "use server"
    const supabase = await createClient()
    await supabase.from("posts").delete().eq("slug",slug)
    redirect("/")
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 md:py-32 animate-in">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to insights
          </Link>

          {/* Header */}
          <header className="space-y-8 mb-16">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                {post.tag || post.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              <Button variant="destructive" onClick={HandleDelete}>Delete Post</Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic border-l-2 border-primary/20 pl-6">
              {post.excerpt}
            </p>
          </header>

          <Separator className="mb-16 opacity-50" />

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-extra-relaxed prose-p:text-lg
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:bg-muted prose-code:px-1 prose-code:rounded
            prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border">
            {/*
                In a real app, we'd use a markdown renderer like 'react-markdown' or 'next-mdx-remote'.
                For now, we'll preserve whitespace and basic formatting.
            */}
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          <Separator className="my-24 opacity-50" />

          {/* Footer / Author */}
          <footer className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
            <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                P
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Priyanshu</h3>
                <p className="text-muted-foreground font-light leading-relaxed max-w-md">
                  Systems engineer and explorer of digital foundations. Writing about the intersection of elegant code and complex systems.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Container>
    </article>
  );
}
