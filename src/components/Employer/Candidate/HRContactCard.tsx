import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

export function HRContactCard() {
  const contact = {
    name: "Sarah Johnson",
    designation: "HR Manager",
    email: "sarah.johnson@abchealthcare.com",
    phone: "+966 50 123 4567",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HR Contact</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Contact Person</p>
            <p className="font-medium">{contact.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Designation</p>
            <p className="font-medium">{contact.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{contact.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{contact.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
