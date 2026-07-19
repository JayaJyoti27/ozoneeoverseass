import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";

export function UploadDocumentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Company Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Document Name</Label>

            <Input />
          </div>

          <div>
            <Label>Category</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="legal">Legal</SelectItem>

                <SelectItem value="tax">Tax</SelectItem>

                <SelectItem value="compliance">Compliance</SelectItem>

                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Upload File</Label>

            <Input type="file" />
          </div>

          <div>
            <Label>Expiry Date</Label>

            <Input type="date" />
          </div>
        </div>

        <DialogFooter>
          <Button>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
