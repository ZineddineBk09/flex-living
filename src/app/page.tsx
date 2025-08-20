import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Home, MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#284e4c] mb-4">
          Flex Living Reviews Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive reviews management system for Flex Living properties.
          Manage guest reviews, approve content, and maintain quality standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-[#284e4c]" />
              <CardTitle>Reviews Dashboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Access the complete reviews management system. View, filter, and
              approve guest reviews from multiple channels including Hostaway
              and Google.
            </p>
            <Link href="/dashboard">
              <Button className="w-full bg-[#284e4c] hover:bg-[#0f3a1f]">
                Open Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-[#284e4c]" />
              <CardTitle>Property Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              View a sample property page with the complete Flex Living
              experience including image gallery, booking widget, and approved
              guest reviews.
            </p>
            <Link href="/properties/1">
              <Button className="w-full bg-[#284e4c] hover:bg-[#0f3a1f]">
                View Property
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
          <MessageSquare className="w-12 h-12 text-[#284e4c] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#284e4c] mb-2">
            Features Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-[#284e4c] mb-1">
                Reviews Management
              </h3>
              <p>Filter, search, and approve guest reviews</p>
            </div>
            <div>
              <h3 className="font-medium text-[#284e4c] mb-1">
                Property Experience
              </h3>
              <p>Complete property pages with booking functionality</p>
            </div>
            <div>
              <h3 className="font-medium text-[#284e4c] mb-1">
                Brand Consistency
              </h3>
              <p>Matches Flex Living design and user experience</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
