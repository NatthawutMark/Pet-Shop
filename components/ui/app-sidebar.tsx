'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Label,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Meterials"
//#region Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
//#endregion

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: DashboardIcon,
    },
    {
        title: "คำสั่งซื้อ",
        url: "/orders",
        icon: AssignmentIcon,
    },
    {
        title: "ข้อมูล",
        url: "/mastData",
        icon: StorageIcon,
    },
    {
        title: "ข้อมูลผู้ใช้",
        url: "/users",
        icon: AccountCircleIcon,
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
            <SidebarFooter className="bg-red-200">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href={`/store`}>
                                <ExitToAppIcon />
                                <span>ออกระบบ</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}