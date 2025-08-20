import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Property } from '@/lib/stores/reviewsStore'

interface FilterBarProps {
  filters: {
    rating: string
    channel: string
    property: string
    status: string
    search: string
  }
  onFilterChange: (filters: Partial<{
    rating: string
    channel: string
    property: string
    status: string
    search: string
  }>) => void
  properties: Property[]
}

export function FilterBar({ filters, onFilterChange, properties }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Rating Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
          <Select value={filters.rating} onValueChange={(value) => onFilterChange({ rating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Ratings</SelectItem>
              <SelectItem value="5 Stars">5 Stars</SelectItem>
              <SelectItem value="4+ Stars">4+ Stars</SelectItem>
              <SelectItem value="3+ Stars">3+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Channel</label>
          <Select value={filters.channel} onValueChange={(value) => onFilterChange({ channel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Channels</SelectItem>
              <SelectItem value="Hostaway">Hostaway</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Property</label>
          <Select value={filters.property} onValueChange={(value) => onFilterChange({ property: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Properties</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id.toString()}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
          <Select value={filters.status} onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reviews..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
