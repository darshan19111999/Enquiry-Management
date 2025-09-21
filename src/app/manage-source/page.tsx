
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

import { sources as initialSources } from '@/lib/mock-data';
import { type Source } from '@/lib/types';
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


export default function ManageSourcePage() {
  const [sources, setSources] = useState<Source[]>(initialSources);
  const [open, setOpen] = useState(false);
  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourceStatus, setNewSourceStatus] = useState('Publish');


  const handleAddSource = () => {
    if (newSourceTitle.trim() === '') return;
    const newSource: Source = {
      id: Math.max(...sources.map(s => s.id)) + 1,
      title: newSourceTitle,
      status: newSourceStatus,
      regDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    };
    setSources([...sources, newSource]);
    setNewSourceTitle('');
    setOpen(false);
  };


  return (
    <div className="flex flex-col gap-8">
       <div>
          <h1 className="text-2xl font-semibold">Manage Source</h1>
          <p className="text-sm text-muted-foreground">Home / Manage Source</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Source List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
                <Input placeholder="Source Title" className="max-w-sm" />
                 <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="By Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Publish">Publish</SelectItem>
                        <SelectItem value="Publish-S">Publish-S</SelectItem>
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
                  <DialogTitle>Add New Source</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new source.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Source Title
                    </Label>
                    <Input id="title" value={newSourceTitle} onChange={(e) => setNewSourceTitle(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                     <Select value={newSourceStatus} onValueChange={setNewSourceStatus}>
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
                  <Button type="submit" onClick={handleAddSource}>Save Source</Button>
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
                  <TableHead>Id</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reg Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((source, index) => (
                  <TableRow key={source.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{source.id}</TableCell>
                    <TableCell>{source.title}</TableCell>
                    <TableCell>
                        <Badge variant={source.status === 'Publish' ? 'default' : 'secondary'} className={source.status === 'Publish' ? 'bg-green-500' : 'bg-red-500'}>{source.status}</Badge>
                    </TableCell>
                    <TableCell>{source.regDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {sources.length} of {sources.length} entries
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
    </div>
  );
}
