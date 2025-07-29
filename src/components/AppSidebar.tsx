'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Columns,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from './Logo';

const menuItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    tooltip: 'Dashboard',
  },
  {
    href: '/recommendations',
    icon: FileText,
    label: 'Recommendations',
    tooltip: 'Visa Recommendations',
  },
  {
    href: '/compare',
    icon: Columns,
    label: 'Compare',
    tooltip: 'Compare Visas',
  },
  {
    href: '/chat',
    icon: MessageSquare,
    label: 'AI Assistant',
    tooltip: 'AI Chat Assistant',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-4 !p-2" tooltip="Profile">
              <Avatar className="size-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">User</span>
                <span className="text-xs text-muted-foreground">user@example.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
