
'use client';

import Link from 'next/link';
import { format, isToday, isPast, isFuture } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Enquiry, FollowUp } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type FollowUpListProps = {
  enquiries: Enquiry[];
  filter: 'previous' | 'today' | 'future';
  title: string;
  description: string;
};

type EnrichedFollowUp = FollowUp & {
  enquiryId: string;
  customerName: string;
};

export function FollowUpList({ enquiries, filter, title, description }: FollowUpListProps) {
  const allFollowUps: EnrichedFollowUp[] = enquiries.flatMap((enquiry) =>
    enquiry.followUps.map((followUp) => ({
      ...followUp,
      enquiryId: enquiry.id,
      customerName: enquiry.customerName,
    }))
  );

  const filterFunctions = {
    previous: (fu: EnrichedFollowUp) => isPast(fu.date) && !fu.completed,
    today: (fu: EnrichedFollowUp) => isToday(fu.date),
    future: (fu: EnrichedFollowUp) => isFuture(fu.date),
  };

  const filteredFollowUps = allFollowUps.filter(filterFunctions[filter]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>A list of {filter} follow-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFollowUps.length > 0 ? (
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredFollowUps.map((followUp) => (
                    <TableRow key={followUp.id}>
                        <TableCell>
                            <Badge variant={followUp.completed ? 'default' : 'secondary'} className={followUp.completed ? 'bg-green-500' : 'bg-yellow-500'}>
                                {followUp.completed ? 'Done' : 'Pending'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Link href={`/enquiries/${followUp.enquiryId}`} className="font-medium text-blue-600 hover:underline">
                                {followUp.customerName}
                            </Link>
                            <div className="text-sm text-muted-foreground">ID: {followUp.enquiryId}</div>
                        </TableCell>
                        <TableCell>{followUp.notes}</TableCell>
                        <TableCell>{format(followUp.date, 'PPP')}</TableCell>
                        <TableCell>{followUp.assignedTo.name}</TableCell>
                        <TableCell>
                            <Checkbox defaultChecked={followUp.completed} aria-label='Mark as complete' />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          ) : (
            <p>No {filter} follow-ups found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
