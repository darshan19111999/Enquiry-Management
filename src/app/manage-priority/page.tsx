
'use client';

import React, { useState } from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search as SearchIcon,
  Edit
} from 'lucide-react';

import { priorities as initialPriorities } from '@/lib/mock-data';
import { type Priority } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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


export default function ManagePriorityPage() {
  const [priorities, setPriorities] = useState<Priority[]>(initialPriorities);
  const [open, setOpen] = useState(false);
  const [newPriorityTitle, setNewPriorityTitle] = useState('');
  const [newPriorityStatus, setNewPriorityStatus] = useState('Publish');

  const [editPriority, setEditPriority] = useState<Priority | null>(null);
  const [editOpen, setEditOpen] = useState(false);


  const handleAddPriority = () => {
    if (newPriorityTitle.trim() === '') return;
    const newPriority: Priority = {
      id: Math.max(...priorities.map(s => s.id)) + 1,
      title: newPriorityTitle,
      status: newPriorityStatus,
      regDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    };
    setPriorities([...priorities, newPriority]);
    setNewPriorityTitle('');
    setOpen(false);
  };
  
  const handleEditClick = (priority: Priority) => {
    setEditPriority(priority);
    setEditOpen(true);
  };
  
  const handleUpdatePriority = () => {
    if (!editPriority || editPriority.title.trim() === '') return;
    setPriorities(priorities.map(s => s.id === editPriority.id ? editPriority : s));
    setEditOpen(false);
    setEditPriority(null);
  };


  return (
    <div className="flex flex-col gap-8">
       <div>
          <h1 className="text-2xl font-semibold">Manage Priority</h1>
          <p className="text-sm text-muted-foreground">Home / Manage Priority</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Priority List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
                <Input placeholder="Priority Title" className="max-w-sm" />
                 <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="By Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Publish">Publish</SelectItem>
                        <SelectItem value="Unpublish">Unpublish</SelectItem>
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
                  <DialogTitle>Add New Priority</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new priority.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Priority Title
                    </Label>
                    <Input id="title" value={newPriorityTitle} onChange={(e) => setNewPriorityTitle(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                     <Select value={newPriorityStatus} onValueChange={setNewPriorityStatus}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Publish">Publish</SelectItem>
                            <SelectItem value="Unpublish">Unpublish</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddPriority}>Save Priority</Button>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reg Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priorities.map((priority, index) => (
                  <TableRow key={priority.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditClick(priority)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{priority.title}</TableCell>
                    <TableCell>
                        <Badge variant={priority.status === 'Publish' ? 'default' : 'secondary'} className={priority.status === 'Publish' ? 'bg-green-500' : 'bg-red-500'}>{priority.status}</Badge>
                    </TableCell>
                    <TableCell>{priority.regDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {priorities.length} of {priorities.length} entries
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
      {editPriority && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Priority</DialogTitle>
              <DialogDescription>
                Make changes to the priority here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Priority Title
                </Label>
                <Input
                  id="edit-title"
                  value={editPriority.title}
                  onChange={(e) =>
                    setEditPriority({ ...editPriority, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editPriority.status}
                  onValueChange={(value) =>
                    setEditPriority({ ...editPriority, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publish">Publish</SelectItem>
                    <SelectItem value="Unpublish">Unpublish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleUpdatePriority}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
