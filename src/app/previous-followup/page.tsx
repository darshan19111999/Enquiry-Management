import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PreviousFollowupPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Previous Follow-ups</h1>
        <p className="text-muted-foreground">
          View all past due follow-up tasks.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Previous Follow-ups</CardTitle>
          <CardDescription>A list of all previous follow-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>List of previous follow-ups will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
