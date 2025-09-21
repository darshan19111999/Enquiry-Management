import { UploadCloud } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Upload</h1>
        <p className="text-muted-foreground">
          Upload a CSV or Excel file to import multiple enquiries at once.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Please ensure your file format matches the required template.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center hover:border-primary">
            <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              Drag and drop your file here
            </h3>
            <p className="text-sm text-muted-foreground">
              or click to browse
            </p>
            <Input type="file" className="sr-only" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="link" asChild>
                <a href="#" download>Download Template</a>
            </Button>
          <Button>Upload and Process</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
