import React from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Eye
} from "lucide-react";

// Mock data
const recentRequests = [
  {
    id: 1,
    employee: "Alice Johnson",
    avatar: "/api/placeholder/32/32",
    type: "Annual Leave",
    duration: "5 days",
    startDate: "2024-02-15",
    status: "pending",
    department: "Engineering"
  },
  {
    id: 2,
    employee: "Bob Smith",
    avatar: "/api/placeholder/32/32", 
    type: "Sick Leave",
    duration: "2 days",
    startDate: "2024-02-12",
    status: "approved",
    department: "Marketing"
  },
  {
    id: 3,
    employee: "Carol Brown",
    avatar: "/api/placeholder/32/32",
    type: "Maternity Leave", 
    duration: "90 days",
    startDate: "2024-03-01",
    status: "pending",
    department: "HR"
  }
];

export const HRDashboard: React.FC = () => {
  const handleApprove = (id: number) => {
    console.log("Approving request", id);
  };

  const handleReject = (id: number) => {
    console.log("Rejecting request", id);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "warning",
      approved: "success", 
      rejected: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">HR Dashboard</h1>
          <p className="text-muted-foreground">Manage your team's leave requests</p>
        </div>
        <QuickActions userType="hr" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Employees"
          value={234}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          gradient="primary"
        />
        <MetricCard
          title="Pending Requests"
          value={18}
          change="5 urgent"
          changeType="neutral"
          icon={Clock}
          gradient="warning"
        />
        <MetricCard
          title="Approval Rate" 
          value="94.2%"
          change="+2.1% from last month"
          changeType="positive"
          icon={TrendingUp}
          gradient="success"
        />
        <MetricCard
          title="Active Leaves"
          value={31}
          change="8 returning this week"
          changeType="neutral"
          icon={Calendar}
          gradient="info"
        />
      </div>

      {/* Recent Leave Requests */}
      <Card className="hover-lift">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Leave Requests</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback className="gradient-primary text-primary-foreground">
                      {request.employee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{request.employee}</p>
                      <Badge variant="outline" className="text-xs">
                        {request.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.type} • {request.duration} • From {request.startDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(request.status)}
                  
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(request.id)}
                        className="text-success hover:bg-success hover:text-white transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        className="text-destructive hover:bg-destructive hover:text-white transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};