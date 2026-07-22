import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Container from "@/components/layout/container";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center animate-in">
            <Container>
                <div className="max-w-md mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-[120px] font-bold tracking-tighter text-primary/10 leading-none select-none">
                            404
                        </h1>
                        <h2 className="text-3xl font-bold tracking-tight">Lost in the void?</h2>
                        <p className="text-muted-foreground font-light text-lg">
                            The insight you're looking for seems to have vanished or never existed in the first place.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Return Home
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild size="lg" className="rounded-full px-8">
                            <Link href="javascript:history.back()">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Link>
                        </Button>
                    </div>

                    <div className="pt-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">
                            Insights / Engineering / Systems
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
