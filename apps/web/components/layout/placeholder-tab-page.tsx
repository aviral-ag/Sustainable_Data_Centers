"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PlaceholderTabPage({ tabTitle }: { tabTitle: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="border-border/70 bg-card/80 text-center shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{tabTitle}</CardTitle>
            <CardDescription>Mock data mode</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">Tab coming soon</CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
