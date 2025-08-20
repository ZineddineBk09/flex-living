"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  MessageSquare,
  Tag,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  BOOKING_CONSTANTS, 
  FORM_CONSTANTS 
} from '@/lib/constants';
import { 
  calculateBookingPrice, 
  formatDateRange as formatDateRangeUtil 
} from '@/lib/utils/business';


interface BookingWidgetProps {
  price?: number;
}

export function BookingWidget({ price = BOOKING_CONSTANTS.DEFAULT_PRICE }: BookingWidgetProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [guestCount, setGuestCount] = useState<number>(BOOKING_CONSTANTS.DEFAULT_GUEST_COUNT);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState(FORM_CONSTANTS.DEFAULT_FORM_DATA);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inquiry submitted:", formData);
    setIsInquiryOpen(false);
  };

  const handleApplyCoupon = () => {
    // Handle coupon application
    console.log("Applying coupon:", couponCode);
  };

  // Calculate pricing using business logic
  const {
    nights,
    basePrice,
    discount,
    cleaningFee,
    total
  } = calculateBookingPrice(price, dateRange.from, dateRange.to);

  const formatDateRange = () => {
    return formatDateRangeUtil(dateRange.from, dateRange.to);
  };

  return (
    <>
      <Card className="sticky top-24 pt-0">
        <CardHeader className="bg-[#284e4c] text-white rounded-t-lg px-6 py-4">
          <div>
            <h3 className="text-xl font-semibold">Book your stay</h3>
            <p className="text-white/80 text-sm mt-1">
              Select dates to see the total price
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Date Selection */}
          <div>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal !pl-8 h-12",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <Calendar className="h-4 w-4 absolute left-8" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) =>
                    setDateRange({
                      from: range?.from,
                      to: range?.to,
                    })
                  }
                  initialFocus
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Count */}
          <div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Select
                value={guestCount.toString()}
                onValueChange={(value) => setGuestCount(parseInt(value))}
              >
                <SelectTrigger className="pl-10 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Booking Details */}
          {dateRange.from && dateRange.to && (
            <div className="space-y-3 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-in</span>
                  <span>{format(dateRange.from, "MMM dd")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-out</span>
                  <span>{format(dateRange.to, "MMM dd")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guests</span>
                  <span>
                    {guestCount} {guestCount === 1 ? "guest" : "guests"}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Base price ({nights} nights)
                  </span>
                  <span>£{basePrice}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-green-600" />
                      <span className="text-green-600">
                        10% length of stay discount
                      </span>
                    </div>
                    <span className="text-green-600">-£{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>£{cleaningFee}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="space-y-2 pt-3 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Have a coupon code?</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="space-y-1 pt-3 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>£{total}</span>
                </div>
                {discount > 0 && (
                  <div className="text-sm text-green-600">
                    You saved £{discount}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full bg-[#284e4c] hover:bg-[#1a3a38] text-white h-12"
              disabled={!dateRange.from || !dateRange.to}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#284e4c] text-[#284e4c] hover:bg-[#284e4c] hover:text-white h-12"
              onClick={() => setIsInquiryOpen(true)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Inquiry
            </Button>
          </div>

          {/* Instant Confirmation */}
          <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
            <Shield className="w-4 h-4 text-[#22c55e]" />
            <span>Instant confirmation</span>
          </div>
        </CardContent>
      </Card>

      {/* Send Inquiry Modal */}
      <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Inquiry</DialogTitle>
            <p className="text-sm text-gray-600">
              Fill out the form below and we&apos;ll get back to you shortly
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2 mt-1">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) =>
                    handleInputChange("countryCode", value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+44">UK</SelectItem>
                    <SelectItem value="+33">FR</SelectItem>
                    <SelectItem value="+213">DZ</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="stayDates">Stay Dates (Optional)</Label>
              <Input
                id="stayDates"
                placeholder="Select dates"
                value={formData.stayDates}
                onChange={(e) => handleInputChange("stayDates", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="specialRequirements">
                Special Requirements (Optional)
              </Label>
              <Textarea
                id="specialRequirements"
                placeholder="Any special requests or requirements..."
                value={formData.specialRequirements}
                onChange={(e) =>
                  handleInputChange("specialRequirements", e.target.value)
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsInquiryOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#284e4c] hover:bg-[#0f3a1f]"
              >
                Send Inquiry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
