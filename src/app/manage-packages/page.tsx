import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagePackagesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Packages</h1>
        <p className="text-muted-foreground">
          Create and manage service or product packages.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Packages</CardTitle>
          <CardDescription>Manage your packages.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Package management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
