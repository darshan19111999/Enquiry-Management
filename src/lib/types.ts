import type { ImagePlaceholder } from './placeholder-images';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: ImagePlaceholder['imageUrl'];
  role: 'Admin' | 'Manager' | 'Executive';
};

export type Activity = {
  id: string;
  timestamp: Date;
  user: Pick<User, 'name' | 'avatar'>;
  action: string;
  details: string;
};

export type FollowUp = {
  id: string;
  date: Date;
  notes: string;
  completed: boolean;
  assignedTo: User;
};

export type EnquiryStatus = 'New' | 'In Progress' | 'Closed-Won' | 'Closed-Lost';
export type EnquirySource = 'Website' | 'Referral' | 'Advertisement' | 'Other';
export type EnquiryType = 'Sales' | 'Support' | 'General Inquiry';
export type EnquiryPriority = 'Low' | 'Medium' | 'High';

export type Enquiry = {
  id: string;
  customerName: string;
  company?: string;
  email: string;
  phone?: string;
  source: EnquirySource;
  type: EnquiryType;
  details: string;
  status: EnquiryStatus;
  priority?: EnquiryPriority;
  createdAt: Date;
  updatedAt: Date;
  assignedTo: User;
  followUps: FollowUp[];
  activityLog: Activity[];
};
