
'use client';

import React, { useState } from 'react';
import {
  PlusCircle,
  Search as SearchIcon,
  Edit
} from 'lucide-react';

import { packages as initialPackages } from '@/lib/mock-data';
import { type Package } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function ManagePackagesPage() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [open, setOpen] = useState(false);
  const [newPackage, setNewPackage] = useState<Omit<Package, 'id' | 'regDate'>>({ title: '', rate: 0, tax: 0, hsnCode: 0, status: 'Publish' });

  const [editPackage, setEditPackage] = useState<Package | null>(null);
  const [editOpen, setEditOpen] = useState(false);


  const handleAddPackage = () => {
    if (newPackage.title.trim() === '') return;
    const newEntry: Package = {
      id: Math.max(...packages.map(p => p.id), 0) + 1,
      ...newPackage,
      regDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    };
    setPackages([...packages, newEntry]);
    setNewPackage({ title: '', rate: 0, tax: 0, hsnCode: 0, status: 'Publish' });
    setOpen(false);
  };
  
  const handleEditClick = (pkg: Package) => {
    setEditPackage(pkg);
    setEditOpen(true);
  };
  
  const handleUpdatePackage = () => {
    if (!editPackage || editPackage.title.trim() === '') return;
    setPackages(packages.map(p => p.id === editPackage.id ? editPackage : p));
    setEditOpen(false);
    setEditPackage(null);
  };


  return (
    <div className="flex flex-col gap-8">
       <div>
          <h1 className="text-2xl font-semibold">Manage Packages</h1>
          <p className="text-sm text-muted-foreground">Home / Manage Packages</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Packages List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
                <Input placeholder="Name" className="max-w-sm" />
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
                <Button variant="destructive">Show All</Button>
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
                <Button onClick={() => setOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Package</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" value={newPackage.title} onChange={(e) => setNewPackage({...newPackage, title: e.target.value})} className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rate" className="text-right">Rate</Label>
                    <Input id="rate" type="number" value={newPackage.rate} onChange={(e) => setNewPackage({...newPackage, rate: parseFloat(e.target.value)})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tax" className="text-right">Tax</Label>
                    <Input id="tax" type="number" value={newPackage.tax} onChange={(e) => setNewPackage({...newPackage, tax: parseFloat(e.target.value)})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hsnCode" className="text-right">HSN Code</Label>
                    <Input id="hsnCode" type="number" value={newPackage.hsnCode} onChange={(e) => setNewPackage({...newPackage, hsnCode: parseInt(e.target.value)})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                     <Select value={newPackage.status} onValueChange={(value) => setNewPackage({...newPackage, status: value})}>
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
                  <Button type="submit" onClick={handleAddPackage}>Save Package</Button>
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
                  <TableHead>Rate</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>HSN Code</TableHead>
                  <TableHead>Reg Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg, index) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditClick(pkg)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{pkg.title}</TableCell>
                    <TableCell>{pkg.rate}</TableCell>
                    <TableCell>{pkg.tax}</TableCell>
                    <TableCell>{pkg.hsnCode}</TableCell>
                    <TableCell>{pkg.regDate}</TableCell>
                    <TableCell>
                        <Badge variant={pkg.status === 'Publish' ? 'default' : 'destructive'} className={pkg.status === 'Publish' ? 'bg-green-500' : 'bg-red-500'}>{pkg.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {packages.length} of {packages.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      {editPackage && (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Package</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Title</Label>
                <Input id="edit-title" value={editPackage.title} onChange={(e) => setEditPackage({ ...editPackage, title: e.target.value })} className="col-span-3"/>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rate" className="text-right">Rate</Label>
                <Input id="edit-rate" type="number" value={editPackage.rate} onChange={(e) => setEditPackage({ ...editPackage, rate: parseFloat(e.target.value) })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tax" className="text-right">Tax</Label>
                <Input id="edit-tax" type="number" value={editPackage.tax} onChange={(e) => setEditPackage({ ...editPackage, tax: parseFloat(e.target.value) })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-hsnCode" className="text-right">HSN Code</Label>
                <Input id="edit-hsnCode" type="number" value={editPackage.hsnCode} onChange={(e) => setEditPackage({ ...editPackage, hsnCode: parseInt(e.target.value) })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select value={editPackage.status} onValueChange={(value) => setEditPackage({ ...editPackage, status: value })}>
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
              <Button type="submit" onClick={handleUpdatePackage}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
