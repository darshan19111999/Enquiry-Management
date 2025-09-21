import Link from 'next/link';
import { PlusCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EnquiryList } from '@/components/enquiries/enquiry-list';
import { enquiries } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enquiries</h1>
          <p className="text-muted-foreground">
            Manage and track all customer enquiries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search enquiries..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              // This would be wired to a state management solution
            />
          </div>
          <Button asChild>
            <Link href="/enquiries/new">
              <PlusCircle className="mr-2 h-4 w-4" /> New Enquiry
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
          <CardDescription>
            A list of all enquiries from various sources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EnquiryList enquiries={enquiries} />
        </CardContent>
      </Card>
    </div>
  );
}
