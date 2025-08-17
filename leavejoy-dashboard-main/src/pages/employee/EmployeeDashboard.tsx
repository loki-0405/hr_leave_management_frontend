import React, { useEffect, useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  Plus,
  X,
} from "lucide-react";
import axios from "axios";

interface LeaveRequest {
  requestid: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  leaveStatus: string;
  days?: number;
  submittedDate?: string;
}

interface DashboardData {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  leaveResponseDtos: LeaveRequest[];
}

export const EmployeeDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "SICK_LEAVE", 
    reason: "",
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8088/api/employee/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      const enrichedRequests = data.leaveResponseDtos.map((req: LeaveRequest) => {
        const start = new Date(req.startDate);
        const end = new Date(req.endDate);
        const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return {
          ...req,
          days,
          submittedDate: start.toISOString().split("T")[0],
        };
      });

      setDashboardData({
        ...data,
        leaveResponseDtos: enrichedRequests,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: "warning",
      APPROVED: "success",
      REJECTED: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const getNextLeave = () => {
    if (!dashboardData) return null;
    const future = dashboardData.leaveResponseDtos.filter((r) => new Date(r.startDate) > new Date());
    if (future.length === 0) return null;
    const next = future.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
    return {
      date: new Date(next.startDate).toLocaleDateString(),
      type: next.leaveType,
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");


      await axios.post("http://localhost:8088/api/employee/leaverequest", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Leave request submitted successfully!");
      setShowForm(false);
      setFormData({
        startDate: "",
        endDate: "",
        leaveType: "",
        reason: "",
      });
      fetchDashboardData(); // Refresh dashboard
    } catch (error) {
      console.error("Failed to submit leave request", error);
      alert("Failed to submit leave request.");
    }
  };

  if (loading || !dashboardData) {
    return <div className="p-6 text-muted-foreground">Loading dashboard...</div>;
  }

  const nextLeave = getNextLeave();

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">Track your request status</p>
        </div>
        <QuickActions userType="employee" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Days Used This Year"
          value={dashboardData.approvedRequests + dashboardData.pendingRequests}
          change={`out of ${dashboardData.totalRequests} total`}
          changeType="neutral"
          icon={Calendar}
          gradient="primary"
        />
        <MetricCard
          title="Pending Requests"
          value={dashboardData.pendingRequests}
          change="awaiting approval"
          changeType="neutral"
          icon={Clock}
          gradient="warning"
        />
        <MetricCard
          title="Approved Requests"
          value={dashboardData.approvedRequests}
          change={`${dashboardData.approvedRequests} approved`}
          changeType="positive"
          icon={CheckCircle}
          gradient="success"
        />
        <MetricCard
          title="Next Leave"
          value={nextLeave ? nextLeave.date : "N/A"}
          change={nextLeave ? nextLeave.type : "No upcoming leave"}
          changeType="neutral"
          icon={TrendingUp}
          gradient="info"
        />
      </div>

      <Card className="hover-lift">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Requests</CardTitle>
            <Button size="sm" className="gradient-primary" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.leaveResponseDtos.map((request) => (
              <div
                key={request.requestid}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
                  <div>
                    <p className="font-medium text-sm">{request.leaveType}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.startDate} - {request.endDate} ({request.days} {request.days === 1 ? "day" : "days"})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {request.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">{getStatusBadge(request.leaveStatus)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Request Modal */}
      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative space-y-4">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setShowForm(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-center">Submit Leave Request</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Leave Type</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              >
                <option value="SICK_LEAVE">Sick</option>
                <option value="CASUAL_LEAVE">Casual</option>
                <option value="ANNUAL_LEAVE">Annual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="gradient-primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
