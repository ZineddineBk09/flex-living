"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup submitted");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl min-w-2xl !p-0 bg-white">
      <DialogTitle className="sr-only"></DialogTitle>
        <div className="flex">
          {/* Left Side - Image */}
          <div className="w-2/5 relative">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?fm=jpg&q=60&w=800&h=600&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D"
              alt="Paris cityscape"
              className="w-full h-full object-cover rounded-l-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-l-lg"></div>
          </div>

          {/* Right Side - Form */}
          <div className="w-3/5 p-8 relative">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold text-[#284e4c] mb-2">
                Sign-up to our newsletter and receive 5% discount
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="mt-1 border-gray-300 focus:border-[#284e4c] focus:ring-[#284e4c]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="mt-1 border-gray-300 focus:border-[#284e4c] focus:ring-[#284e4c]"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    className="mt-1 border-gray-300 focus:border-[#284e4c] focus:ring-[#284e4c]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label
                      htmlFor="countryCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Country
                    </Label>
                    <select
                      id="countryCode"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#284e4c] focus:ring-[#284e4c]"
                    >
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+213">🇩🇿 +213</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Phone number"
                      className="mt-1 border-gray-300 focus:border-[#284e4c] focus:ring-[#284e4c]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#284e4c] hover:bg-[#0f3a1f] text-white py-3"
                >
                  Subscribe
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to receive marketing communications
                  from us.
                </p>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
