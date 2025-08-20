"use client";

import { useEffect, useState } from "react";
import { Users, Bed, Bath, Home } from "lucide-react";
import { ImageGallery } from "@/components/property/ImageGallery";
import { BookingWidget } from "@/components/property/BookingWidget";
import { PropertyDescription } from "@/components/property/PropertyDescription";
import { PropertyPolicies } from "@/components/property/PropertyPolicies";
import { Amenities } from "@/components/property/Amenities";
import { Location } from "@/components/property/Location";
import { GuestReviews } from "@/components/property/GuestReviews";
import { NewsletterPopup } from "@/components/property/NewsletterPopup";
import { Property } from "@/lib/stores/reviewsStore";
import { notFound } from "next/navigation";
import { getPropertyImages } from "@/lib/utils/business";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<number | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id);
      setPropertyId(id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/reviews/hostaway");
        const data = await response.json();

        const foundProperty = data.properties.find(
          (p: Property) => p.id === propertyId
        );

        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        setError("Failed to load property");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId !== null) {
      fetchProperty();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !property) {
    notFound();
  }

  const propertyImages = property ? getPropertyImages(property) : [];
  const estimatedPrice = property.price || Math.round(property.averageRating * 30 + 50);

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        {/* Property Title and Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#284e4c] mb-4">
            {property.name}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{property.guests} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              <span>{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5" />
              <span>{property.bathrooms} bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>{property.type}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="flex flex-col lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={propertyImages} title={property.name} />

            {/* Property Description */}
            <PropertyDescription property={property} />

            {/* Property Policies */}
            <PropertyPolicies property={property} />

            {/* Amenities */}
            <Amenities property={property} />

            {/* Location */}
            <Location property={property} />

            {/* Guest Reviews */}
            <GuestReviews propertyId={propertyId || property?.id || 0} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingWidget price={property.price} />
          </div>
        </div>
      </main>

      <NewsletterPopup />
    </>
  );
}
