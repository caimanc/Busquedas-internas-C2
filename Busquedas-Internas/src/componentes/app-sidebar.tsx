"use client"

import { Search, Binary, Hash, Square, FolderSymlink, Scissors } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Búsqueda Lineal",
    icon: Search,
    href: "/busqueda-lineal",
  },
  {
    title: "Búsqueda Binaria",
    icon: Binary,
    href: "/busqueda-binaria",
  },
  {
    title: "Método Hash Módulo",
    icon: Hash,
    href: "/hash-modulo",
  },
  {
    title: "Método Hash Cuadrado",
    icon: Square,
    href: "/hash-cuadrado",
  },
  {
    title: "Método Hash por Plegamiento",
    icon: FolderSymlink,
    href: "/hash-plegamiento",
  },
  {
    title: "Método Hash por Truncamiento",
    icon: Scissors,
    href: "/hash-truncamiento",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <>
      <Sidebar>
        <div className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Algoritmos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

