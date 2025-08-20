import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import { Trend } from "@/lib/stores/reviewsStore";

interface TrendsAnalysisProps {
  trends: Trend | null;
}

export function TrendsAnalysis({ trends }: TrendsAnalysisProps) {
  if (!trends) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Trends
          </CardTitle>
          <p className="text-sm text-gray-600">
            Review volume and performance over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.monthlyStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{stat.month}</div>
                  <div className="text-sm text-gray-500">
                    {stat.totalReviews} reviews
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {stat.averageRating.toFixed(1)} ⭐
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.approvalRate.toFixed(0)}% approved
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Issues
          </CardTitle>
          <p className="text-sm text-gray-600">
            Recurring problems identified in reviews
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.commonIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">{issue.issue}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{issue.count}</div>
                  <div className="text-sm text-gray-500">
                    {issue.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Channel Performance
          </CardTitle>
          <p className="text-sm text-gray-600">
            Review performance across different platforms
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trends.channelPerformance.map((channel, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{channel.channel}</h3>
                  <Badge variant="outline">
                    {channel.totalReviews} reviews
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Average Rating</div>
                    <div className="font-medium">
                      {channel.averageRating.toFixed(1)} ⭐
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Approval Rate</div>
                    <div className="font-medium">
                      {channel.approvalRate.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
