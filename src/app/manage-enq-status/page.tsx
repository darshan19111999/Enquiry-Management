import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageEnquiryStatusPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Enquiry Status</h1>
        <p className="text-muted-foreground">
          Customize the statuses for your enquiry workflow.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Statuses</CardTitle>
          <CardDescription>Manage your enquiry statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Enquiry status management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
