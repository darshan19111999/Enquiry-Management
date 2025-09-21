import { User, Enquiry, Source, Priority } from './types';
import { PlaceHolderImages } from './placeholder-images';

const userImages = {
  sarah: PlaceHolderImages.find((p) => p.id === 'user-avatar-1')!.imageUrl,
  david: PlaceHolderImages.find((p) => p.id === 'user-avatar-2')!.imageUrl,
  maria: PlaceHolderImages.find((p) => p.id === 'user-avatar-3')!.imageUrl,
  admin: PlaceHolderImages.find((p) => p.id === 'user-avatar-4')!.imageUrl,
};

export const users: User[] = [
  { id: 'user-1', name: 'Sarah Miller', email: 'sarah.miller@example.com', avatar: userImages.sarah, role: 'Manager' },
  { id: 'user-2', name: 'David Chen', email: 'david.chen@example.com', avatar: userImages.david, role: 'Executive' },
  { id: 'user-3', name: 'Maria Rodriguez', email: 'maria.rodriguez@example.com', avatar: userImages.maria, role: 'Executive' },
  { id: 'user-4', name: 'Admin User', email: 'admin@example.com', avatar: userImages.admin, role: 'Admin' },
];

export const enquiries: Enquiry[] = [
  {
    id: 'ENQ-001',
    customerName: 'John Doe',
    company: 'Innovate Corp',
    email: 'john.doe@innovatecorp.com',
    phone: '123-456-7890',
    source: 'Website',
    type: 'Sales',
    details: 'Interested in a demo for the enterprise plan. Needs to understand integration capabilities with our existing CRM.',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2023-10-01T10:00:00Z'),
    updatedAt: new Date('2023-10-03T14:30:00Z'),
    assignedTo: users[0],
    followUps: [
      { id: 'fu-1', date: new Date('2023-10-05T10:00:00Z'), notes: 'Scheduled a demo call.', completed: false, assignedTo: users[0] },
    ],
    activityLog: [
      { id: 'act-1', timestamp: new Date('2023-10-01T10:00:00Z'), user: { name: 'System', avatar: '' }, action: 'Created', details: 'Enquiry created from website form.' },
      { id: 'act-2', timestamp: new Date('2023-10-01T10:05:00Z'), user: users[3], action: 'Assigned', details: 'Assigned to Sarah Miller.' },
      { id: 'act-3', timestamp: new Date('2023-10-03T14:30:00Z'), user: users[0], action: 'Status Change', details: 'Status changed from New to In Progress.' },
    ],
  },
  {
    id: 'ENQ-002',
    customerName: 'Jane Smith',
    company: 'Solutions Inc.',
    email: 'jane.smith@solutions.inc',
    phone: '098-765-4321',
    source: 'Referral',
    type: 'Support',
    details: 'Having trouble with API key generation. The documentation is unclear on the required permissions.',
    status: 'New',
    priority: 'Medium',
    createdAt: new Date('2023-10-02T15:20:00Z'),
    updatedAt: new Date('2023-10-02T15:20:00Z'),
    assignedTo: users[1],
    followUps: [],
    activityLog: [
      { id: 'act-4', timestamp: new Date('2023-10-02T15:20:00Z'), user: { name: 'System', avatar: '' }, action: 'Created', details: 'Enquiry created from referral.' },
    ],
  },
  {
    id: 'ENQ-003',
    customerName: 'Peter Jones',
    email: 'peter.jones@email.com',
    phone: '555-555-5555',
    source: 'Advertisement',
    type: 'General Inquiry',
    details: 'What are the pricing tiers available? Cannot find the page on the website.',
    status: 'Closed-Won',
    priority: 'Low',
    createdAt: new Date('2023-09-28T11:00:00Z'),
    updatedAt: new Date('2023-09-30T17:00:00Z'),
    assignedTo: users[2],
    followUps: [
      { id: 'fu-2', date: new Date('2023-09-28T14:00:00Z'), notes: 'Sent pricing page link and brochure.', completed: true, assignedTo: users[2] },
    ],
    activityLog: [
        { id: 'act-5', timestamp: new Date('2023-09-28T11:00:00Z'), user: { name: 'System', avatar: '' }, action: 'Created', details: 'Enquiry created.' },
        { id: 'act-6', timestamp: new Date('2023-09-30T17:00:00Z'), user: users[2], action: 'Status Change', details: 'Status changed to Closed-Won.' },
    ],
  },
    {
    id: 'ENQ-004',
    customerName: 'Emily White',
    company: 'DataStream LLC',
    email: 'emily.w@datastream.com',
    phone: '555-123-4567',
    source: 'Website',
    type: 'Sales',
    details: 'We are a large educational institution looking for a custom solution. We need to discuss bulk licensing and on-premise deployment options.',
    status: 'New',
    priority: 'High',
    createdAt: new Date('2023-10-04T09:15:00Z'),
    updatedAt: new Date('2023-10-04T09:15:00Z'),
    assignedTo: users[0],
    followUps: [],
    activityLog: [
      { id: 'act-7', timestamp: new Date('2023-10-04T09:15:00Z'), user: { name: 'System', avatar: '' }, action: 'Created', details: 'High-value enquiry from website.' }
    ],
  },
  {
    id: 'ENQ-005',
    customerName: 'Michael Brown',
    email: 'michael.b@fast-forward.co',
    phone: '555-987-6543',
    source: 'Other',
    type: 'Support',
    details: 'My account seems to be locked. I have tried resetting the password but did not receive an email.',
    status: 'Closed-Lost',
    priority: 'Medium',
    createdAt: new Date('2023-09-25T18:00:00Z'),
    updatedAt: new Date('2023-09-27T10:00:00Z'),
    assignedTo: users[1],
    followUps: [
        { id: 'fu-3', date: new Date('2023-09-26T10:00:00Z'), notes: 'Manually reset password and sent temporary credentials.', completed: true, assignedTo: users[1] },
        { id: 'fu-4', date: new Date('2023-09-27T10:00:00Z'), notes: 'Customer did not respond. Closing ticket.', completed: true, assignedTo: users[1] }
    ],
    activityLog: [
        { id: 'act-8', timestamp: new Date('2023-09-25T18:00:00Z'), user: { name: 'System', avatar: '' }, action: 'Created', details: 'Support ticket created.' },
        { id: 'act-9', timestamp: new Date('2023-09-27T10:00:00Z'), user: users[1], action: 'Status Change', details: 'Status changed to Closed-Lost.' }
    ],
  },
];

export const sources: Source[] = [
    { id: 1, title: 'Website', status: 'Publish', regDate: '18 Apr 2025, 11:07 AM' },
    { id: 6, title: 'Leaflet', status: 'Publish', regDate: '19 Apr 2025, 07:36 PM' },
    { id: 7, title: 'ChatBot', status: 'Publish', regDate: '24 Apr 2025, 11:30 AM' },
    { id: 8, title: 'Landing Page', status: 'Publish', regDate: '03 May 2025, 05:45 PM' },
    { id: 4, title: 'News Paper', status: 'Publish', regDate: '05 May 2025, 09:34 PM' },
    { id: 9, title: 'Other', status: 'Publish-S', regDate: '07 May 2025, 05:57 PM' },
    { id: 10, title: 'Exhibition', status: 'Publish', regDate: '07 May 2025, 05:58 PM' },
    { id: 11, title: 'Toll Free', status: 'Publish', regDate: '08 Jul 2025, 02:54 PM' },
];

export const priorities: Priority[] = [
    { id: 1, title: 'Low', status: 'Publish', regDate: '05 May 2025, 10:44 PM' },
    { id: 2, title: 'Medium', status: 'Publish', regDate: '19 Apr 2025, 11:06 PM' },
    { id: 3, title: 'High', status: 'Publish', regDate: '18 Apr 2025, 11:47 AM' },
];


export const pastSuccessfulCases = `
Case 1: Enterprise Sales Enquiry
- Enquiry: Demo request for enterprise plan.
- Actions:
  - Initial contact within 2 hours via personalized email.
  - Follow-up call scheduled for next day to qualify needs.
  - Demo conducted 3 days after initial contact.
  - Follow-up email with custom proposal sent 1 day after demo.
- Outcome: Deal closed in 2 weeks.
- Key Insight: Quick, multi-channel follow-up is crucial for high-value sales leads. A personalized proposal after the demo shows commitment.

Case 2: Technical Support Enquiry
- Enquiry: User confused about a specific feature.
- Actions:
  - Responded within 30 minutes with a link to the relevant documentation and a short video tutorial.
  - Followed up 24 hours later to ensure the issue was resolved.
- Outcome: User confirmed issue resolved and expressed satisfaction.
- Key Insight: Providing immediate, actionable resources (docs, videos) is highly effective. A follow-up check-in improves customer satisfaction.
`;
