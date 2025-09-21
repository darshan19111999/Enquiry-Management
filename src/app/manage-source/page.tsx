import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageSourcePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Source</h1>
        <p className="text-muted-foreground">
          Add, edit, or remove enquiry sources.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sources</CardTitle>
          <CardDescription>Manage your enquiry sources.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Source management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
