import { 
  Sofa, 
  Wifi, 
  ChefHat, 
  Bed, 
  Flame 
} from 'lucide-react'
import { AmenityCategory } from '@/lib/constants'

// Utility function to get the appropriate icon for each amenity category
export const getCategoryIcon = (category: AmenityCategory) => {
  switch (category) {
    case AmenityCategory.LIVING_ROOM:
      return Sofa
    case AmenityCategory.INTERNET_OFFICE:
      return Wifi
    case AmenityCategory.KITCHEN_DINING:
      return ChefHat
    case AmenityCategory.BEDROOM_LAUNDRY:
      return Bed
    case AmenityCategory.GENERAL:
      return Flame
    default:
      return Flame
  }
}

// Utility function to get category display name
export const getCategoryDisplayName = (category: AmenityCategory): string => {
  return category
}

// Utility function to group amenities by category
export const groupAmenitiesByCategory = <T extends { category: AmenityCategory }>(
  amenities: T[]
): Record<AmenityCategory, T[]> => {
  return amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<AmenityCategory, T[]>)
}
