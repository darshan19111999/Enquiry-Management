import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookedEnquiryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booked Enquiries</h1>
        <p className="text-muted-foreground">
          View all enquiries that have been successfully booked or won.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Booked Enquiries</CardTitle>
          <CardDescription>A list of all booked enquiries.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>List of booked enquiries will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
