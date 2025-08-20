"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/stores/reviewsStore";
import { UI_CONSTANTS } from "@/lib/constants";
import { truncateText } from "@/lib/utils/business";

interface PropertyDescriptionProps {
  property: Property;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullDescription = property.description;
  const shortDescription = truncateText(fullDescription, UI_CONSTANTS.MAX_DESCRIPTION_LENGTH);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-[#284e4c]">
          About this property
        </h3>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {isExpanded ? fullDescription : shortDescription}
        </div>
        <Button
          variant="link"
          className="p-0 h-auto underline text-[#284e4c] hover:text-[#0f3a1f] mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </CardContent>
    </Card>
  );
}
