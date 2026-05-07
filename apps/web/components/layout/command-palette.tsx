"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface CommandPaletteItem {
  href: string;
  label: string;
}

export function CommandPalette({ items }: { items: readonly CommandPaletteItem[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a tab..." />
      <CommandList>
        <CommandEmpty>No destinations found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {items.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
