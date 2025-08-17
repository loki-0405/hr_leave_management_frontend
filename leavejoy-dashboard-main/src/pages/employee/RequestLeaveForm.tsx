
// src/pages/employee/RequestLeaveForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

export const RequestLeaveForm: React.FC = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "SICK_LEAVE",
    reason: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      await axios.post("http://localhost:8088/api/employee/leaverequest", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Leave request submitted successfully!");
      setFormData({
        startDate: "",
        endDate: "",
        leaveType: "SICK_LEAVE",
        reason: "",
      });
    } catch (error) {
      console.error("Failed to submit leave request", error);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded shadow-md max-w-xl mx-auto">
      <div>
        <Label>Start Date</Label>
        <Input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>End Date</Label>
        <Input
          type="date"
          value={formData.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Leave Type</Label>
        <Select
          value={formData.leaveType}
          onValueChange={(value) => handleChange("leaveType", value)}
        >
          <SelectTrigger>
            {formData.leaveType}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SICK_LEAVE">Sick</SelectItem>
            <SelectItem value="CASUAL_LEAVE">Casual</SelectItem>
            <SelectItem value="ANNUAL_LEAVE">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Reason</Label>
        <Textarea
          rows={3}
          value={formData.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">Submit Request</Button>
    </form>
  );
};
