
'use client';

import React, { useState } from 'react';
import {
  PlusCircle,
  Search as SearchIcon,
  Edit
} from 'lucide-react';

import { enquiryStatuses as initialEnquiryStatuses } from '@/lib/mock-data';
import { type EnquiryStatusType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function ManageEnquiryStatusPage() {
  const [enquiryStatuses, setEnquiryStatuses] = useState<EnquiryStatusType[]>(initialEnquiryStatuses);
  const [open, setOpen] = useState(false);
  const [newEnquiryStatus, setNewEnquiryStatus] = useState({ title: '', sequence: '', status: 'Publish' });

  const [editEnquiryStatus, setEditEnquiryStatus] = useState<EnquiryStatusType | null>(null);
  const [editOpen, setEditOpen] = useState(false);


  const handleAddEnquiryStatus = () => {
    if (newEnquiryStatus.title.trim() === '' || newEnquiryStatus.sequence.trim() === '') return;
    const newStatus: EnquiryStatusType = {
      id: Math.max(...enquiryStatuses.map(s => s.id)) + 1,
      title: newEnquiryStatus.title,
      status: newEnquiryStatus.status,
      sequence: parseInt(newEnquiryStatus.sequence),
      regDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    };
    setEnquiryStatuses([...enquiryStatuses, newStatus]);
    setNewEnquiryStatus({ title: '', sequence: '', status: 'Publish' });
    setOpen(false);
  };
  
  const handleEditClick = (status: EnquiryStatusType) => {
    setEditEnquiryStatus(status);
    setEditOpen(true);
  };
  
  const handleUpdateEnquiryStatus = () => {
    if (!editEnquiryStatus || editEnquiryStatus.title.trim() === '') return;
    setEnquiryStatuses(enquiryStatuses.map(s => s.id === editEnquiryStatus.id ? editEnquiryStatus : s));
    setEditOpen(false);
    setEditEnquiryStatus(null);
  };


  return (
    <div className="flex flex-col gap-8">
       <div>
          <h1 className="text-2xl font-semibold">Manage Enquiry Status</h1>
          <p className="text-sm text-muted-foreground">Home / Manage Enquiry Status</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Status List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
                <Input placeholder="Enquiry Status" className="max-w-sm" />
                 <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="By Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Publish">Publish</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Search</Button>
                <Button variant="secondary">Show All</Button>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries per page</span>
              <Button variant="outline">Copy</Button>
              <Button variant="outline">CSV</Button>
              <Button variant="outline">Excel</Button>
              <Button variant="outline">PDF</Button>
              <Button variant="outline">Print</Button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 md:grow-0">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Enquiry Status</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" value={newEnquiryStatus.title} onChange={(e) => setNewEnquiryStatus({...newEnquiryStatus, title: e.target.value})} className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sequence" className="text-right">
                      Sequence
                    </Label>
                    <Input id="sequence" type="number" value={newEnquiryStatus.sequence} onChange={(e) => setNewEnquiryStatus({...newEnquiryStatus, sequence: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                     <Select value={newEnquiryStatus.status} onValueChange={(value) => setNewEnquiryStatus({...newEnquiryStatus, status: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Publish">Publish</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddEnquiryStatus}>Save Status</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Sequence</TableHead>
                  <TableHead>Id</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reg Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiryStatuses.map((status, index) => (
                  <TableRow key={status.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditClick(status)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{status.sequence}</TableCell>
                    <TableCell>{status.id}</TableCell>
                    <TableCell>{status.title}</TableCell>
                    <TableCell>
                        <Badge variant={status.status === 'Publish' ? 'default' : 'destructive'} className={status.status === 'Publish' ? 'bg-green-500' : 'bg-red-500'}>{status.status}</Badge>
                    </TableCell>
                    <TableCell>{status.regDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {enquiryStatuses.length} of {enquiryStatuses.length} entries
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
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      {editEnquiryStatus && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Enquiry Status</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editEnquiryStatus.title}
                  onChange={(e) =>
                    setEditEnquiryStatus({ ...editEnquiryStatus, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-sequence" className="text-right">
                  Sequence
                </Label>
                <Input
                  id="edit-sequence"
                  type="number"
                  value={editEnquiryStatus.sequence}
                  onChange={(e) =>
                    setEditEnquiryStatus({ ...editEnquiryStatus, sequence: parseInt(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editEnquiryStatus.status}
                  onValueChange={(value) =>
                    setEditEnquiryStatus({ ...editEnquiryStatus, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publish">Publish</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleUpdateEnquiryStatus}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
