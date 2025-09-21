
"use client";

import Link from 'next/link';
import { MoreHorizontal, Edit, Trash, FileText } from 'lucide-react';

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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { type Enquiry, type EnquiryStatus } from '@/lib/types';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

type EnquiryListProps = {
  enquiries: Enquiry[];
};

const statusColors: Record<EnquiryStatus, string> = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Closed-Won': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Closed-Lost': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

export function EnquiryList({ enquiries }: EnquiryListProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead padding="checkbox">
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead className="w-[50px]">Sr. No</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Enq Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Executive</TableHead>
              <TableHead>Reg Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry, index) => (
              <TableRow key={enquiry.id}>
                <TableCell padding="checkbox">
                  <Checkbox aria-label={`Select row ${index + 1}`} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/enquiries/${enquiry.id}`} className="hover:underline text-blue-600">
                    <div className="font-medium">{enquiry.customerName}</div>
                  </Link>
                </TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell>{enquiry.type}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`border-0 ${statusColors[enquiry.status]}`}
                  >
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell>{enquiry.source}</TableCell>
                <TableCell>
                  <Badge variant={enquiry.priority === 'High' ? 'destructive' : (enquiry.priority === 'Medium' ? 'secondary' : 'outline')}>
                    {enquiry.priority || 'Low'}
                  </Badge>
                </TableCell>
                <TableCell>{enquiry.assignedTo.name}</TableCell>
                <TableCell>
                  {format(enquiry.createdAt, 'dd MMM yyyy, hh:mm a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing 1 to 10 of 1,545 entries
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
