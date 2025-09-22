'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageUsersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground">
          Add, edit, or remove users from your team.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>User management interface will be here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
