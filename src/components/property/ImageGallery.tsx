"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="grid grid-cols-4 gap-2 h-[500px] mb-[220px] relative z-10">
        {/* Main Image */}
        <div
          className="col-span-3 relative group cursor-pointer"
          onClick={openLightbox}
        >
          <img
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover rounded-l-xl"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-l-xl flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="col-span-1 grid grid-rows-2 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-r-xl",
                index === 0 && "rounded-tr-xl",
                index === 3 && "rounded-br-xl"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-200",
                  selectedImage === index
                    ? "scale-110"
                    : "group-hover:scale-105"
                )}
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-black/30" />
              )}
            </div>
          ))}

          {/* View All Photos Button */}
          {images.length > 4 && (
            <div
              className="relative group cursor-pointer overflow-hidden rounded-br-xl"
              onClick={openLightbox}
            >
              <img
                src={images[4]}
                alt={`${title} - More photos`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-sm font-medium">View all photos</div>
                  <div className="text-xs opacity-80">
                    +{images.length - 4} more
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl min-w-3xl w-full h-[75vh] p-0 bg-black/95 border-0 z-50">
          <DialogTitle className="sr-only"></DialogTitle>

          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="lg"
              className="w-fit !p-0 absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-transparent hover:text-white"
              onClick={prevImage}
              disabled={selectedImage === 0}
            >
              <ChevronLeft size={24} className="text-xl" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="!p-0 absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-transparent hover:text-white"
              onClick={nextImage}
              disabled={selectedImage === images.length - 1}
            >
              <ChevronRight size={24} className="text-xl" />
            </Button>

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <img
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} of {images.length}
            </div>

            {/* Thumbnail Carousel */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                    selectedImage === index
                      ? "border-white"
                      : "border-transparent hover:border-white/50"
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
