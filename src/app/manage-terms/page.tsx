import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageTermsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Terms & Conditions</h1>
        <p className="text-muted-foreground">
          Edit the terms and conditions for your services.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>Manage your terms and conditions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Terms & conditions management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
