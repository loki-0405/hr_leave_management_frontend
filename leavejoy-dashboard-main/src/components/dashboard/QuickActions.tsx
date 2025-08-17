import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  UserPlus, 
  Calendar, 
  FileText, 
  Settings,
  Download 
} from "lucide-react";

interface QuickAction {
  label: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
}

interface QuickActionsProps {
  userType: "hr" | "employee";
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userType }) => {
  const hrActions: QuickAction[] = [
    {
      label: "Add Employee",
      icon: UserPlus,
      onClick: () => console.log("Add employee"),
      variant: "default"
    },
    {
      label: "View Requests",
      icon: FileText,
      onClick: () => console.log("View requests"),
      variant: "outline"
    },

  ];

  const employeeActions: QuickAction[] = [
   
  ];

  const actions = userType === "hr" ? hrActions : employeeActions;

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant}
          onClick={action.onClick}
          className="flex items-center gap-2 hover-lift"
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
};