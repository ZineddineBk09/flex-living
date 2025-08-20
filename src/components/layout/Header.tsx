"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Building2,
  Info,
  Briefcase,
  Mail,
  Globe,
  PoundSterling,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#284e4c] shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={isScrolled ? "/logo-light.webp" : "/logo-dark.webp"}
            alt="Flex Living Logo"
            width={150}
            height={50}
            className="w-24 h-6"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "py-2 px-3 h-auto",
                  !isScrolled 
                    ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                    : "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Landlords
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-2">
              <DropdownMenuItem>Become a Host</DropdownMenuItem>
              <DropdownMenuItem>Property Management</DropdownMenuItem>
              <DropdownMenuItem>Host Resources</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            className={cn(
              "py-2 px-3 h-auto",
              !isScrolled 
                ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                : "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Info className="w-4 h-4 mr-2" />
            About Us
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "py-2 px-3 h-auto",
              !isScrolled 
                ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                : "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Careers
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "py-2 px-3 h-auto",
              !isScrolled 
                ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                : "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </nav>

        {/* Language and Currency */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "py-2 px-3 h-auto",
                  !isScrolled 
                    ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                    : "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Globe className="w-4 h-4 mr-2" />
                English
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "py-2 px-3 h-auto",
                  !isScrolled 
                    ? "text-[#284e4c] hover:bg-gray-100 hover:text-[#284e4c]" 
                    : "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <PoundSterling className="w-4 h-4 mr-2" />
                GBP
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>£ GBP</DropdownMenuItem>
              <DropdownMenuItem>€ EUR</DropdownMenuItem>
              <DropdownMenuItem>$ USD</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
