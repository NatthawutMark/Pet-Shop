import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Meterials"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "คำสั่งซื้อ",
        url: "/orders",
        icon: Inbox,
    },
    {
        title: "ข้อมูล",
        url: "/mastItem",
        icon: Calendar,
    },
    {
        title: "ข้อมูลผู้ใช้",
        url: "#",
        icon: Search,
    },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
]

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarContent className="bg-red-200">
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={`/admin${item.url}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}