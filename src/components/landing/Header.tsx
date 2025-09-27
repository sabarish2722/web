
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
    width="120"
    height="32"
    viewBox="0 0 163 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M27.424 43.04L13.752 1.28H19.016L30.12 35.84L41.224 1.28H46.52L32.816 43.04H27.424Z"
      fill="#F25822"
    />
    <path
      d="M48.2499 43.04V1.28H53.5139V43.04H48.2499Z"
      fill="#F25822"
      transform="translate(5, 0)"
    />
    <path
      d="M62.3733 43.04V1.28H82.0213C87.8133 1.28 91.2693 3.68 91.2693 8.32C91.2693 11.648 89.6053 13.888 86.8213 15.2L92.7093 25.12V26.4H86.2773L81.2853 17.28H67.6133V43.04H62.3733ZM67.6133 12.32H80.5173C83.8773 12.32 85.9573 13.472 85.9573 16.032C85.9573 18.528 83.9093 19.808 80.5173 19.808H67.6133V12.32Z"
      fill="#F25822"
      transform="translate(8, 0)"
    />
    <path
      d="M93.3183 43.04V1.28H113.806C120.022 1.28 123.446 4 123.446 9.6C123.446 13.088 122.054 15.616 119.334 17.216C122.966 18.656 124.942 21.664 124.942 25.792C124.942 31.904 120.71 35.2 113.574 35.2H98.5583V43.04H93.3183ZM98.5583 30.24H112.55C116.502 30.24 118.982 28.48 118.982 25.504C118.982 22.464 116.47 20.64 112.414 20.64H98.5583V30.24ZM98.5583 15.84H111.422C115.11 15.84 117.35 14.144 117.35 11.232C117.35 8.256 115.142 6.56 111.454 6.56H98.5583V15.84Z"
      fill="#F25822"
      transform="translate(14, 0)"
    />
    <path d="M139.125 43.04V1.28H144.389V43.04H139.125Z" fill="currentColor" />
    <path
      d="M149.333 43.04V1.28H154.597V43.04H149.333Z"
      fill="currentColor"
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
