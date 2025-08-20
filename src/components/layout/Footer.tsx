import {
  Send,
  Facebook,
  Instagram,
  Linkedin,
  HeadphonesIcon,
  Mail,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const socialMediaLink = {
  facebook: "https://www.facebook.com/theflex.global",
  instagram: "https://www.instagram.com/theflex.global/?locale=us&hl=en",
  linkedin: "https://www.facebook.com/theflexliving/",
};

export function Footer() {
  return (
    <footer className="bg-[#284e4c] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-2 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Join The Flex */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Join The Flex</h3>
            <p className="text-gray-300 mb-6">
              Sign up now and stay up to date on our latest news and exclusive
              deals including 5% off your first stay!
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                />
                <Input
                  placeholder="Last name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                />
              </div>
              <Input
                placeholder="Email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
              />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Phone number"
                    className="pl-16 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans pr-12"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Flag className="w-4 h-4" />
                    <span className="text-sm">+44</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-white text-[#284e4c] hover:bg-gray-200">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* The Flex */}
          <div>
            <h3 className="text-xl font-semibold mb-4">The Flex</h3>
            <p className="text-gray-300 mb-4">
              Professional property management services for landlords, flexible
              corporate lets for businesses and quality accommodations for
              short-term and long-term guests.
            </p>
            <div className="flex">
              <Link
                href={socialMediaLink.facebook}
                target="_blank"
                className="text-white hover:bg-white/10 hover:text-white p-2 rounded-lg"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href={socialMediaLink.instagram}
                target="_blank"
                className="text-white hover:bg-white/10 hover:text-white p-2 rounded-lg"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={socialMediaLink.linkedin}
                target="_blank"
                className="text-white hover:bg-white/10 hover:text-white p-2 rounded-lg"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <HeadphonesIcon className="w-4 h-4 mr-2" />
                  Support Numbers
                </h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <span>🇬🇧</span>
                    <div className="w-full flex flex-col">
                      <span>United Kingdom</span>
                      <span>+44 77 2374 5646</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>🇩🇿</span>
                    <div className="w-full flex flex-col">
                      <span>Algeria</span>
                      <span>+33 7 57 59 22 41</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>🇫🇷</span>
                    <div className="w-full flex flex-col">
                      <span>France</span>
                      <span>+33 6 44 64 57 17</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@theflex.global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t font-semibold border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© 2025 The Flex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
