import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This dashboard route does not exist.
        </CardContent>
      </Card>
    </div>
  );
}
