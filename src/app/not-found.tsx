import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, MapPin, Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 pt-16">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#284e4c] leading-none">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22c55e] to-[#284e4c] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="px-12 py-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#284e4c] mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                Don&apos;t worry, we&apos;ll help you find your way back.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-y-4 mb-8">
              <Link href="/">
                <Button className="w-full bg-[#284e4c] hover:bg-[#0f3a1f] text-white py-4 text-lg">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button variant="outline" className="w-full border-[#284e4c] text-[#284e4c] hover:bg-[#284e4c] hover:text-white py-4 text-lg">
                  <Building2 className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Link href="/properties/1">
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#284e4c]/20 hover:border-[#284e4c]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="w-6 h-6 text-[#284e4c]" />
                    </div>
                    <h3 className="font-semibold text-[#284e4c]">View Properties</h3>
                    <p className="text-sm text-gray-600">Explore our listings</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard">
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#284e4c]/20 hover:border-[#284e4c]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Search className="w-6 h-6 text-[#284e4c]" />
                    </div>
                    <h3 className="font-semibold text-[#284e4c]">Reviews Dashboard</h3>
                    <p className="text-sm text-gray-600">Manage reviews</p>
                  </CardContent>
                </Card>
              </Link>

              <a href="mailto:info@theflex.global">
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#284e4c]/20 hover:border-[#284e4c]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Building2 className="w-6 h-6 text-[#284e4c]" />
                    </div>
                    <h3 className="font-semibold text-[#284e4c]">Contact Support</h3>
                    <p className="text-sm text-gray-600">Get help</p>
                  </CardContent>
                </Card>
              </a>
            </div>

            {/* Helpful Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-[#284e4c] mb-3">
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">📞 Call us:</p>
                  <p>+44 77 2374 5646</p>
                </div>
                <div>
                  <p className="font-medium mb-1">✉️ Email us:</p>
                  <p>info@theflex.global</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="w-32 h-32 bg-[#284e4c] rounded-full"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="w-24 h-24 bg-[#22c55e] rounded-full"></div>
        </div>
      </div>
    </main>
  );
}
