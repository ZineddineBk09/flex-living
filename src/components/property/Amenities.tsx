"use client";

import { useState } from "react";
import {
  Tv,
  Wifi,
  Snowflake,
  ChefHat,
  ArrowUpDown,
  Flame,
  Clock,
  Sofa,
  Coffee,
  Refrigerator,
  Utensils,
  ChevronRight,
  Car,
  DoorOpen,
  WashingMachine,
  Monitor,
  Bubbles,
  Wind,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AmenityCategory, UI_CONSTANTS } from "@/lib/constants";
import {
  getCategoryIcon,
  groupAmenitiesByCategory,
} from "@/lib/utils/amenities";
import { Property } from "@/lib/stores/reviewsStore";

interface AmenitiesProps {
  property: Property;
}

// Icon mapping for amenity icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Tv,
  Snowflake,
  ChefHat,
  Flame,
  Car,
  DoorOpen,
  Coffee,
  Sofa,
  ArrowUpDown,
  Clock,
  Refrigerator,
  Utensils,
  // Fallback icons for missing ones
  Monitor,
  WashingMachine,
  Dishwasher: Bubbles,
  Iron: Shirt,
  HairDryer: Wind,
};

export function Amenities({ property }: AmenitiesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Convert property amenities to the format expected by the component
  const amenities = property.amenities.map(amenity => ({
    name: amenity.name,
    icon: iconMap[amenity.icon] || Utensils,
    category: amenity.category as AmenityCategory
  }));

  const displayedAmenities = amenities.slice(
    0,
    UI_CONSTANTS.MAX_AMENITIES_DISPLAY
  );

  const groupedAmenities = groupAmenitiesByCategory(amenities);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-semibold text-[#284e4c]">Amenities</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="text-gray-600 hover:text-[#284e4c]"
          >
            View all amenities <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {displayedAmenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Amenities Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl min-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All amenities</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-8">
            {Object.entries(groupedAmenities).map(
              ([category, categoryAmenities]) => (
                <div key={category} className="mb-auto">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    {(() => {
                      const Icon = getCategoryIcon(category as AmenityCategory);
                      return <Icon className="w-5 h-5" />;
                    })()}
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {categoryAmenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm">{amenity.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
