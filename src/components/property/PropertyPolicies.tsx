import { Clock, Shield, Calendar, X, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Property } from "@/lib/stores/reviewsStore";

interface PropertyPoliciesProps {
  property: Property;
}

export function PropertyPolicies({ property }: PropertyPoliciesProps) {
  return (
    <div className="space-y-6">
      {/* Stay Policies */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[#284e4c]">
            Stay Policies
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Check-in & Check-out */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-[#284e4c]" />
              <h4 className="font-medium">Check-in & Check-out</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Check-in time</p>
                <p className="font-semibold">{property.policies.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-out time</p>
                <p className="font-semibold">{property.policies.checkOut}</p>
              </div>
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-[#284e4c]" />
              <h4 className="font-medium">House Rules</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.policies.houseRules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-[#284e4c]" />
              <h4 className="font-medium">Cancellation Policy</h4>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">{property.policies.cancellationPolicy}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
