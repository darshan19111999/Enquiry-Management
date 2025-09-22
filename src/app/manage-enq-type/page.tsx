"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Add this import
} from "@/components/ui/dialog"; // Make sure this path is correct
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EnqType } from "@/lib/types";
import { getEnqTypes, addEnqType, updateEnqType, deleteEnqType } from "@/lib/enqType";

export default function ManageEnqType() {
  const [enqTypes, setEnqTypes] = useState<EnqType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEnqType, setEditingEnqType] = useState<EnqType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadEnqTypes();
  }, []);

  const loadEnqTypes = async () => {
    const data = await getEnqTypes();
    setEnqTypes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEnqType) {
      await updateEnqType(editingEnqType.id, formData);
    } else {
      await addEnqType(formData);
    }
    setIsDialogOpen(false);
    setEditingEnqType(null);
    setFormData({ name: "", description: "" });
    loadEnqTypes();
  };

  const handleEdit = (enqType: EnqType) => {
    setEditingEnqType(enqType);
    setFormData({
      name: enqType.name,
      description: enqType.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry type?")) {
      await deleteEnqType(id);
      loadEnqTypes();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Enquiry Types</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Enquiry Type</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEnqType ? "Edit Enquiry Type" : "Add New Enquiry Type"}
              </DialogTitle>
              <DialogDescription>
                {editingEnqType
                  ? "Update the enquiry type details below."
                  : "Add a new enquiry type to the system."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingEnqType ? "Update" : "Add"} Enquiry Type
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enqTypes.map((enqType) => (
            <TableRow key={enqType.id}>
              <TableCell className="font-medium">{enqType.name}</TableCell>
              <TableCell>{enqType.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(enqType)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(enqType.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
