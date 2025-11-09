"use client";

import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavItems = [
  { href: "/", label: "Home" },
  { href: "/prodotti", label: "Prodotti" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg">
          Apenelope
        </Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {NavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile: hamburger + drawer con le stesse voci */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Apri menu"
              className="inline-flex items-center justify-center rounded-md border px-3 py-2"
            >
              <MenuIcon className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4">
              <SheetHeader className="mb-2">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav>
                <ul className="space-y-1">
                  {NavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}