import type { ExaminationDashboardData } from "../types/ExaminationDashboard";

export const dashboardData: ExaminationDashboardData = {
  tracking: {
    progress: 78,
    metrics: [
      {
        id: 1,
        icon: "centre",
        label: "Active Centres",
        value: 2847,
      },
      {
        id: 2,
        icon: "users",
        label: "Candidates",
        value: 1203421,
      },
    ],
  },

  performance: {
    health: "Healthy",
    score: 92,
    uptime: 99.8,
    attendance: "96.4%",
  },

  activeUsers: {
    total: 18420,
    growth: "+8.4%",
    stats: [
      {
        id: 1,
        icon: "today",
        label: "Today",
        description: "Active candidates",
        value: 3240,
      },
      {
        id: 2,
        icon: "week",
        label: "This Week",
        description: "Weekly activity",
        value: 9840,
      },
      {
        id: 3,
        icon: "month",
        label: "This Month",
        description: "Monthly activity",
        value: 18420,
      },
    ],
  },

  performanceChart: [
    { month: "Jan", performance: 65 },
    { month: "Feb", performance: 72 },
    { month: "Mar", performance: 78 },
    { month: "Apr", performance: 75 },
    { month: "May", performance: 82 },
    { month: "Jun", performance: 88 },
  ],

  activity: [
    {
      id: 1,
      title: "New candidate registration",
      location: "Lagos examination centre",
      time: "2m ago",
      type: "success",
    },
    {
      id: 2,
      title: "Result batch uploaded",
      location: "Abuja processing centre",
      time: "12m ago",
      type: "info",
    },
    {
      id: 3,
      title: "Centre approval pending",
      location: "Kano examination centre",
      time: "32m ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Candidate verification completed",
      location: "Kaduna examination centre",
      time: "1h ago",
      type: "success",
    },
  ],
};
