"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DeletePostButton({ 
  onDelete 
}: { 
  onDelete: () => Promise<void> 
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button 
      variant="destructive" 
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this post?")) {
          startTransition(async () => {
            await onDelete();
          });
        }
      }}
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </Button>
  );
}