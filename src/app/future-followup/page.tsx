import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FutureFollowupPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Future Follow-ups</h1>
        <p className="text-muted-foreground">
          View all follow-up tasks scheduled for the future.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Future Follow-ups</CardTitle>
          <CardDescription>A list of all future follow-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>List of future follow-ups will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
