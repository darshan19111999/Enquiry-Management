import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TodaysFollowupPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Today's Follow-ups</h1>
        <p className="text-muted-foreground">
          All follow-up tasks scheduled for today.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today's Follow-ups</CardTitle>
          <CardDescription>A list of today's follow-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>List of today's follow-ups will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
