'use client';

import React, { useState } from 'react';
import { PlusCircle, Search as SearchIcon, Edit } from 'lucide-react';

import { enquiryTypes as initialEnquiryTypes } from '@/lib/mock-data';
import { type EnquiryTypeType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ManageEnquiryTypePage() {
  const [enquiryTypes, setEnquiryTypes] = useState<EnquiryTypeType[]>(initialEnquiryTypes);
  const [open, setOpen] = useState(false);
  const [newEnquiryType, setNewEnquiryType] = useState({ title: '', status: 'Publish' });

  const [editEnquiryType, setEditEnquiryType] = useState<EnquiryTypeType | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleAddEnquiryType = () => {
    if (newEnquiryType.title.trim() === '') return;
    const newType: EnquiryTypeType = {
      id: Math.max(...enquiryTypes.map(s => s.id), 0) + 1,
      title: newEnquiryType.title,
      status: newEnquiryType.status,
      regDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    };
    setEnquiryTypes([...enquiryTypes, newType]);
    setNewEnquiryType({ title: '', status: 'Publish' });
    setOpen(false);
  };

  const handleEditClick = (type: EnquiryTypeType) => {
    setEditEnquiryType(type);
    setEditOpen(true);
  };

  const handleUpdateEnquiryType = () => {
    if (!editEnquiryType || editEnquiryType.title.trim() === '') return;
    setEnquiryTypes(enquiryTypes.map(s => s.id === editEnquiryType.id ? editEnquiryType : s));
    setEditOpen(false);
    setEditEnquiryType(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Manage Enquiry Type</h1>
        <p className="text-sm text-muted-foreground">Home / Manage Enquiry Type</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enquiry Type List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters & Actions */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Enquiry Type" className="max-w-sm" />
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

          {/* Search & Add */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 md:grow-0">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Enquiry Type</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" value={newEnquiryType.title} onChange={(e) => setNewEnquiryType({ ...newEnquiryType, title: e.target.value })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <Select value={newEnquiryType.status} onValueChange={(value) => setNewEnquiryType({ ...newEnquiryType, status: value })}>
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
                  <Button type="submit" onClick={handleAddEnquiryType}>Save Type</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
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
                {enquiryTypes.map((type, index) => (
                  <TableRow key={type.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditClick(type)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>{type.title}</TableCell>
                    <TableCell>
                      <Badge variant={type.status === 'Publish' ? 'default' : 'destructive'} className={type.status === 'Publish' ? 'bg-green-500' : 'bg-red-500'}>{type.status}</Badge>
                    </TableCell>
                    <TableCell>{type.regDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {enquiryTypes.length} of {enquiryTypes.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editEnquiryType && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Enquiry Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Title</Label>
                <Input id="edit-title" value={editEnquiryType.title} onChange={(e) => setEditEnquiryType({ ...editEnquiryType, title: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select value={editEnquiryType.status} onValueChange={(value) => setEditEnquiryType({ ...editEnquiryType, status: value })}>
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
              <Button type="submit" onClick={handleUpdateEnquiryType}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
