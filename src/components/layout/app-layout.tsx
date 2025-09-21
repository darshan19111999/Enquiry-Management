"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Briefcase,
  LayoutDashboard,
  Settings,
  UploadCloud,
  MapPin,
  Gem,
  CheckSquare,
  List,
  Users,
  PlusCircle,
  XCircle,
  BookCheck,
  Package,
  FileText,
  History,
  CalendarCheck,
  CalendarClock,
  LogOut,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { users } from '@/lib/mock-data';
import { Separator } from '../ui/separator';

const currentUser = users.find((u) => u.role === 'Admin')!;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-10 w-10 p-0" asChild>
              <Link href="/">
                <Briefcase className="h-6 w-6 text-primary" />
              </Link>
            </Button>
            <span className="text-lg font-semibold text-sidebar-primary">
              EnquiryTrack
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip="Dashboard"
              >
                <Link href="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-source'}
                tooltip="Manage Source"
              >
                <Link href="/manage-source">
                  <MapPin />
                  <span>Manage Source</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-priority'}
                tooltip="Manage Priority"
              >
                <Link href="/manage-priority">
                  <Gem />
                  <span>Manage Priority</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-enq-status'}
                tooltip="Manage Enq Status"
              >
                <Link href="/manage-enq-status">
                  <CheckSquare />
                  <span>Manage Enq Status</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-enq-type'}
                tooltip="Manage Enq Type"
              >
                <Link href="/manage-enq-type">
                  <List />
                  <span>Manage Enq Type</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-users'}
                tooltip="Manage Users"
              >
                <Link href="/manage-users">
                  <Users />
                  <span>Manage Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip="Manage Enquiry"
              >
                <Link href="/">
                  <List />
                  <span>Manage Enquiry</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/enquiries/new'}
                tooltip="Add Enquiry"
              >
                <Link href="/enquiries/new">
                  <PlusCircle />
                  <span>Add Enquiry</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/canceled-enquiry'}
                tooltip="Canceled Enquiry"
              >
                <Link href="/canceled-enquiry">
                  <XCircle />
                  <span>Canceled Enquiry</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/booked-enquiry'}
                tooltip="Booked Enquiry"
              >
                <Link href="/booked-enquiry">
                  <BookCheck />
                  <span>Booked Enquiry</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/upload'}
                tooltip="Upload Enquiries"
              >
                <Link href="/upload">
                  <UploadCloud />
                  <span>Upload Enquiries</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-packages'}
                tooltip="Manage Packages"
              >
                <Link href="/manage-packages">
                  <Package />
                  <span>Manage Packages</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/manage-terms'}
                tooltip="Manage Terms & Conditions"
              >
                <Link href="/manage-terms">
                  <FileText />
                  <span>Manage Terms & Conditions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/previous-followup'}
                tooltip="Previous Followup"
              >
                <Link href="/previous-followup">
                  <History />
                  <span>Previous Followup</span>
                  <SidebarMenuBadge>315</SidebarMenuBadge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/todays-followup'}
                tooltip="Todays Followup"
              >
                <Link href="/todays-followup">
                  <CalendarCheck />
                  <span>Todays Followup</span>
                  <SidebarMenuBadge>32</SidebarMenuBadge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/future-followup'}
                tooltip="Future Followup"
              >
                <Link href="/future-followup">
                  <CalendarClock />
                  <span>Future Followup</span>
                  <SidebarMenuBadge>118</SidebarMenuBadge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/reports')}
                tooltip="Reports"
              >
                <Link href="/reports">
                  <BarChart3 />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2 bg-sidebar-border" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Logout">
                <Link href="#">
                  <LogOut />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-4 flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="truncate font-medium text-sidebar-primary">
                {currentUser.name}
              </p>
              <p className="truncate text-xs">{currentUser.email}</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">{/* Header content can go here if needed */}</div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
