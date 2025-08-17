
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaveRequest {
  requestid: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  leaveStatus: string;
  days?: number;
  submittedDate?: string;
}

export const MyRequests: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8088/api/employee/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const enriched = response.data.leaveResponseDtos.map((req: LeaveRequest) => {
        const start = new Date(req.startDate);
        const end = new Date(req.endDate);
        const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return {
          ...req,
          days,
          submittedDate: start.toISOString().split("T")[0],
        };
      });

      setRequests(enriched);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
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

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading requests...</div>;
  }

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-muted-foreground">No requests found.</p>
          ) : (
            requests.map((request) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyRequests;
