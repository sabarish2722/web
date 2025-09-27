
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#mission", label: "Our Mission" },
  { href: "#partners", label: "For Business" },
  { href: "#investors", label: "Invest" },
  { href: "#contact", label: "Contact" },
];

const Logo = () => (
    <svg
      width="135"
      height="36"
      viewBox="0 0 135 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.2355 35.5L11.8355 6.39999L0.435547 35.5H7.23555L10.3355 27.4H14.9355L18.0355 35.5H23.2355ZM12.6355 10.8L15.3355 24.3H9.93555L12.6355 10.8Z"
        fill="#F94D1D"
      />
      <path d="M28.0355 35.5V6.39999H34.8355V35.5H28.0355Z" fill="#F94D1D" />
      <path
        d="M48.0355 35.5V6.39999H54.8355V21.3L61.6355 6.39999H67.2355L58.2355 23.2L67.7355 35.5H61.6355L54.8355 24.9V35.5H48.0355Z"
        fill="#F94D1D"
      />
      <path
        d="M71.2355 35.5V6.39999H86.8355V10.5H78.0355V18.3H85.7355V22.5H78.0355V31.3H87.2355V35.5H71.2355Z"
        fill="#F94D1D"
      />
      <path
        d="M107.536 6.40002V35.5H100.736V10.8L93.9355 35.5H90.4355L83.6355 10.8V35.5H76.8355V6.40002H84.6355L89.1355 24.1L93.6355 6.40002H101.436L107.536 6.40002Z"
        fill="#F94D1D"
      />
      <path
        d="M110.136 35.5V6.39999H116.936V35.5H110.136Z"
        fill="#2622E7"
      />
      <path
        d="M121.336 35.5V6.39999H128.136V35.5H121.336Z"
        fill="#2622E7"
      />
    </svg>
  );

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden sm:flex" variant="outline" asChild>
            <Link href="#partners">Partner With Us</Link>
          </Button>
          <Button className="hidden sm:flex" asChild>
            <Link href="#download">Download the App</Link>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                    <Button asChild>
                        <Link href="#download">Download the App</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="#partners">Partner With Us</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
