import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  Building,
  Info,
  Tag,
  Users,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { format } from 'date-fns';

import { enquiries, users, pastSuccessfulCases } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AiSuggestions } from '@/components/enquiries/ai-suggestions';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function EnquiryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const enquiry = enquiries.find((e) => e.id === params.id);

  if (!enquiry) {
    notFound();
  }

  const EnquiryDetailItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string;
  }) =>
    value ? (
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      </div>
    ) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Enquiry Details</CardTitle>
            <CardDescription>
              All information related to enquiry #{enquiry.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <EnquiryDetailItem
                icon={User}
                label="Customer Name"
                value={enquiry.customerName}
              />
              <EnquiryDetailItem
                icon={Building}
                label="Company"
                value={enquiry.company}
              />
              <EnquiryDetailItem
                icon={Mail}
                label="Email"
                value={enquiry.email}
              />
              <EnquiryDetailItem
                icon={Phone}
                label="Phone"
                value={enquiry.phone}
              />
              <EnquiryDetailItem
                icon={Info}
                label="Source"
                value={enquiry.source}
              />
              <EnquiryDetailItem
                icon={Tag}
                label="Type"
                value={enquiry.type}
              />
            </div>
            <Separator />
            <EnquiryDetailItem
              icon={MessageSquare}
              label="Details"
              value={enquiry.details}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              AI-Powered Suggestions
            </CardTitle>
            <CardDescription>
              Optimal follow-up times and communication strategies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AiSuggestions
              enquiryDetails={enquiry.details}
              pastSuccessfulCases={pastSuccessfulCases}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Follow-ups</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {enquiry.followUps.length > 0 ? (
              enquiry.followUps.map((followUp) => (
                <div key={followUp.id} className="flex items-start gap-4">
                  <Checkbox
                    id={`fu-${followUp.id}`}
                    checked={followUp.completed}
                    className="mt-1"
                  />
                  <div className="grid gap-1">
                    <Label
                      htmlFor={`fu-${followUp.id}`}
                      className="font-medium"
                    >
                      {followUp.notes}
                    </Label>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(followUp.date, 'PPP')}</span>
                      <span>-</span>
                      <span>Assigned to {followUp.assignedTo.name}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No follow-ups scheduled.
              </p>
            )}
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="new-follow-up">Add a new follow-up</Label>
              <Textarea
                id="new-follow-up"
                placeholder="Describe the next action..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Schedule Date</Button>
                <Button>Add Follow-up</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select defaultValue={enquiry.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                  <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Assigned To</Label>
              <Select defaultValue={enquiry.assignedTo.id}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {enquiry.activityLog.map((activity) => (
                <li key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{' '}
                      {activity.action.toLowerCase()}{' '}
                      <span className="font-medium">{activity.details}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(activity.timestamp, 'PPpp')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
