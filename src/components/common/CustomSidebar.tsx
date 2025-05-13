"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  ChevronRightIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  KeyRoundIcon,
  SunMoonIcon,
  BarChartIcon,
  HelpCircleIcon,
  FileTextIcon,
} from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

export default function CustomSidebar() {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      subItems: [
        { label: "Profile", href: "/settings/profile", icon: UserIcon },
        { label: "Account", href: "/settings/account", icon: KeyRoundIcon },
        {
          label: "Appearance",
          href: "/settings/appearance",
          icon: SunMoonIcon,
        },
      ],
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChartIcon,
    },
    {
      label: "Help",
      icon: HelpCircleIcon,
      subItems: [
        {
          label: "Documentation",
          href: "/help/docs",
          icon: FileTextIcon,
        },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-3 pt-2 pb-1 text-lg font-semibold">
          <a href="/">Transport</a>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.subItems && item.subItems.length > 0 ? (
                  <Collapsible key={item.label} asChild>
                    <SidebarMenuItem className="!p-0">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="group flex w-full items-center justify-between">
                          <span className="flex items-center">
                            {item.icon ? (
                              <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                            ) : (
                              <div className="mr-2 h-4 w-4 flex-shrink-0" />
                            )}
                            {item.label}
                          </span>
                          <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden py-1 pl-7 pr-2 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton asChild className="h-8">
                                <a
                                  href={subItem.href}
                                  className="flex items-center"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                                  )}
                                  {subItem.label}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.href}
                        className="group flex w-full items-center justify-between"
                      >
                        <span className="flex items-center">
                          {item.icon ? (
                            <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                          ) : (
                            <div className="mr-2 h-4 w-4 flex-shrink-0" />
                          )}
                          {item.label}
                        </span>
                        <div className="h-4 w-4 shrink-0" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="p-3 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Transport App
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
