"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  Droplet,
  ExternalLink,
  Info,
  Leaf,
  Menu,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";

const navItems = [
  { href: "/water-stress", label: "Water Stress", icon: Droplet },
  { href: "/grid-impact", label: "Grid Impact", icon: Zap },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/forecast", label: "Forecast", icon: TrendingUp },
  { href: "/about", label: "About", icon: Info },
] as const;

function SidebarNav({
  onNavigate,
  collapsed = false,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        const showSeparator = index === 3;
        return (
          <div key={item.href}>
            {showSeparator ? <Separator className="my-3" /> : null}
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-border/80 bg-accent/70 text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <span
                className={cn(
                  "h-5 w-1 rounded-full transition-colors",
                  isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/30",
                )}
              />
              <item.icon className="h-4 w-4" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

function SidebarPanel({
  onNavigate,
  collapsed = false,
  lastUpdated,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  lastUpdated: string;
}) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border/70 bg-sidebar/80 p-4 backdrop-blur-xl transition-all",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="mb-5 flex items-center gap-3 px-2">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Leaf className="h-5 w-5" />
        </div>
        <div className={cn(collapsed && "hidden")}>
          <p className="text-sm font-semibold">Sustainability X</p>
          <p className="text-sm text-muted-foreground">Data Centers</p>
        </div>
      </div>
      <SidebarNav onNavigate={onNavigate} collapsed={collapsed} />
      <div className={cn("mt-auto rounded-xl border border-border/60 bg-background/70 p-3 text-xs text-muted-foreground", collapsed && "hidden")}>
        <div className="mb-1 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Live status
        </div>
        <p>Data updated: {lastUpdated}</p>
      </div>
    </aside>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Syncing...");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <CommandPalette items={navItems} />
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <SidebarPanel collapsed={collapsed} lastUpdated={lastUpdated} />
        </div>
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" />}>
                  <Menu className="h-4 w-4" />
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SidebarPanel lastUpdated={lastUpdated} />
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Sustainability X Data Centers</span>
              </div>
              <div className="hidden flex-1 items-center gap-2 md:flex">
                <Button variant="outline" size="icon" onClick={() => setCollapsed((prev) => !prev)}>
                  {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                </Button>
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input readOnly value="Search (⌘K)" className="max-w-sm bg-background/80" />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    window.open("https://github.com/aviral-ag/Sustainable_Data_Centers", "_blank", "noopener,noreferrer")
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open GitHub repository</span>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
