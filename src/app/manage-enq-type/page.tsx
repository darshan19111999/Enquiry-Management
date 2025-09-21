import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageEnquiryTypePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Enquiry Type</h1>
        <p className="text-muted-foreground">
          Add or edit the types of enquiries you receive.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Types</CardTitle>
          <CardDescription>Manage your enquiry types.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Enquiry type management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
