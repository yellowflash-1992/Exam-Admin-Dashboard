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

  stats: {
    candidates: 1203421,
    centres: 2847,
    exams: 156,
    passRate: 78,
  },

  map: [
    {
      name: "Lagos",
      coordinates: [3.3792, 6.5244],
      candidates: 85000,
      centres: 320,
    },
    {
      name: "Abuja",
      coordinates: [7.4908, 9.0765],
      candidates: 45000,
      centres: 180,
    },
    {
      name: "Kano",
      coordinates: [8.5919, 12.0022],
      candidates: 65000,
      centres: 210,
    },
    {
      name: "Ibadan",
      coordinates: [3.9151, 7.3776],
      candidates: 55000,
      centres: 195,
    },
    {
      name: "Port Harcourt",
      coordinates: [7.0498, 4.8156],
      candidates: 40000,
      centres: 160,
    },
    {
      name: "Kaduna",
      coordinates: [7.4388, 10.5264],
      candidates: 35000,
      centres: 145,
    },
    {
      name: "Enugu",
      coordinates: [7.4951, 6.4531],
      candidates: 38000,
      centres: 150,
    },
    {
      name: "Jos",
      coordinates: [8.8921, 9.8965],
      candidates: 30000,
      centres: 125,
    },
  ],

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
