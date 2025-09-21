import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CanceledEnquiryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Canceled Enquiries</h1>
        <p className="text-muted-foreground">
          View all enquiries that have been canceled.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Canceled Enquiries</CardTitle>
          <CardDescription>A list of all canceled enquiries.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>List of canceled enquiries will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
