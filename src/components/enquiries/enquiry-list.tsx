"use client";

import Link from 'next/link';
import { MoreHorizontal, Briefcase, Headset, HelpCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { type Enquiry, type EnquiryStatus } from '@/lib/types';
import { format } from 'date-fns';

type EnquiryListProps = {
  enquiries: Enquiry[];
};

const statusColors: Record<EnquiryStatus, string> = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Closed-Won': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Closed-Lost': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const typeIcons = {
    'Sales': <Briefcase className="h-4 w-4" />,
    'Support': <Headset className="h-4 w-4" />,
    'General Inquiry': <HelpCircle className="h-4 w-4" />,
};

export function EnquiryList({ enquiries }: EnquiryListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Type</span>
          </TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Source</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enquiries.map((enquiry) => (
          <TableRow key={enquiry.id}>
            <TableCell className="hidden sm:table-cell">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                    {typeIcons[enquiry.type]}
                </div>
            </TableCell>
            <TableCell>
              <Link href={`/enquiries/${enquiry.id}`} className="hover:underline">
                <div className="font-medium">{enquiry.customerName}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {enquiry.email}
                </div>
              </Link>
            </TableCell>
            <TableCell>{enquiry.source}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant="outline"
                className={`border-0 ${statusColors[enquiry.status]}`}
              >
                {enquiry.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(enquiry.createdAt, 'PP')}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/enquiries/${enquiry.id}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
