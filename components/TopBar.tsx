"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Insights", href: "/" },
    { name: "Draft", href: "/blogs/create" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
                    >
                        InnateVoid<span className="text-primary">.</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        <Button variant="ghost" size="sm" >
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button size="sm" >
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-6" />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}

function Separator({ className, orientation = "horizontal" }: { className?: string, orientation?: "horizontal" | "vertical" }) {
    return (
        <div
            className={cn(
                "bg-border shrink-0",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
        />
    );
}
