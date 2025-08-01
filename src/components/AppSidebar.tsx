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
  LogIn,
  LogOut,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from './Logo';
import { useAuth } from '@/context/AuthContext';
import { logoutAction } from '@/app/auth/actions';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

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
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    // This client-side redirect is important to refresh the auth state
    router.push('/login'); 
  };

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
          {user ? (
            <SidebarMenuItem>
               <div className="w-full">
                <SidebarMenuButton tooltip="Logout" size="lg" className="gap-4 !p-2 w-full">
                   <Avatar className="size-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person" />
                    <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">Logout</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                   <Button variant="ghost" size="icon" type="button" className="ml-auto" onClick={handleLogout}>
                      <LogOut />
                   </Button>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          ) : (
             <SidebarMenuItem>
                <Link href="/login" className="w-full">
                    <SidebarMenuButton tooltip="Login" >
                        <LogIn />
                        <span>Login</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
