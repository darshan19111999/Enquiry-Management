import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagePriorityPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Priority</h1>
        <p className="text-muted-foreground">
          Define and manage enquiry priority levels.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Priorities</CardTitle>
          <CardDescription>Manage your enquiry priorities.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Priority management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
