export type TrackingIcon = "centre" | "users";

export type ActivityStatus = "success" | "warning" | "info";

export type ActiveUserIcon = "today" | "week" | "month";

export const dashboardData = {
  tracking: {
    progress: 72,

    metrics: [
      {
        id: 1,
        label: "Centres Open",
        value: 2847,
        icon: "centre" as TrackingIcon,
      },

      {
        id: 2,
        label: "Checked In",
        value: 890213,
        icon: "users" as TrackingIcon,
      },
    ],
  },

  performance: {
    health: "A+",
    score: 98.6,
    uptime: 99.9,
    attendance: "Excellent",
  },

  performanceChart: [
    {
      month: "Jan",
      waec: 65,
      jamb: 58,
    },
    {
      month: "Feb",
      waec: 72,
      jamb: 64,
    },
    {
      month: "Mar",
      waec: 78,
      jamb: 70,
    },
    {
      month: "Apr",
      waec: 75,
      jamb: 73,
    },
    {
      month: "May",
      waec: 82,
      jamb: 76,
    },
    {
      month: "Jun",
      waec: 88,
      jamb: 81,
    },
  ],

  activity: [
    {
      id: 1,
      title: "Centre Activated",
      location: "Kano South",
      time: "2 mins ago",
      type: "success" as ActivityStatus,
    },

    {
      id: 2,
      title: "Supervisor Assigned",
      location: "Lagos Mainland",
      time: "8 mins ago",
      type: "info" as ActivityStatus,
    },

    {
      id: 3,
      title: "Candidate Checked In",
      location: "FCT Abuja",
      time: "12 mins ago",
      type: "success" as ActivityStatus,
    },

    {
      id: 4,
      title: "Incident Report",
      location: "Kaduna Central",
      time: "18 mins ago",
      type: "warning" as ActivityStatus,
    },
  ],

  activeUsers: {
    total: 48920,
    growth: "+8.4%",
    stats: [
      {
        id: 1,
        label: "Today",
        description: "Logged in",
        value: 3240,
        icon: "today" as ActiveUserIcon,
      },
      {
        id: 2,
        label: "This Week",
        description: "Active users",
        value: 12300,
        icon: "week" as ActiveUserIcon,
      },
      {
        id: 3,
        label: "This Month",
        description: "Registered",
        value: 48920,
        icon: "month" as ActiveUserIcon,
      },
    ],
  },
};
