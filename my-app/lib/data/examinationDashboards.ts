import type { ExaminationDashboardData } from "../types/ExaminationDashboard";

export const examinationDashboards: Record<
  "WAEC" | "JAMB" | "NECO" | "NABTEB",
  ExaminationDashboardData
> = {
  WAEC: {
    tracking: {
      progress: 78,
      metrics: [
        {
          id: 1,
          icon: "users",
          label: "Registrations",
          value: 1203421,
        },
        {
          id: 2,
          icon: "centre",
          label: "Centres",
          value: 2847,
        },
      ],
    },

    stats: {
      candidates: 1203421,
      centres: 2847,
      exams: 156,
      passRate: 78,
    },

    performance: {
      health: "Excellent",
      score: 87,
      uptime: 99.8,
      attendance: "94.6%",
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
          value: 8420,
        },
        {
          id: 2,
          icon: "week",
          label: "This week",
          description: "Active candidates",
          value: 15680,
        },
        {
          id: 3,
          icon: "month",
          label: "This month",
          description: "Active candidates",
          value: 18420,
        },
      ],
    },

    performanceChart: [
      { month: "Jan", performance: 68 },
      { month: "Feb", performance: 72 },
      { month: "Mar", performance: 75 },
      { month: "Apr", performance: 78 },
      { month: "May", performance: 81 },
      { month: "Jun", performance: 84 },
    ],

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

    activity: [
      {
        id: 1,
        title: "New registration batch received",
        location: "Lagos",
        time: "2m ago",
        type: "success",
      },
      {
        id: 2,
        title: "Centre registration updated",
        location: "Abuja",
        time: "18m ago",
        type: "info",
      },
      {
        id: 3,
        title: "Candidate verification pending",
        location: "Kano",
        time: "42m ago",
        type: "warning",
      },
    ],
  },

  JAMB: {
    tracking: {
      progress: 64,
      metrics: [
        {
          id: 1,
          icon: "users",
          label: "Registrations",
          value: 824000,
        },
        {
          id: 2,
          icon: "centre",
          label: "Centres",
          value: 1296,
        },
      ],
    },

    stats: {
      candidates: 824000,
      centres: 1296,
      exams: 98,
      passRate: 74,
    },

    performance: {
      health: "Good",
      score: 82,
      uptime: 99.4,
      attendance: "91.8%",
    },

    activeUsers: {
      total: 12680,
      growth: "+5.7%",
      stats: [
        {
          id: 1,
          icon: "today",
          label: "Today",
          description: "Active candidates",
          value: 5820,
        },
        {
          id: 2,
          icon: "week",
          label: "This week",
          description: "Active candidates",
          value: 10440,
        },
        {
          id: 3,
          icon: "month",
          label: "This month",
          description: "Active candidates",
          value: 12680,
        },
      ],
    },

    performanceChart: [
      { month: "Jan", performance: 61 },
      { month: "Feb", performance: 65 },
      { month: "Mar", performance: 69 },
      { month: "Apr", performance: 73 },
      { month: "May", performance: 77 },
      { month: "Jun", performance: 82 },
    ],

    map: [
      {
        name: "Lagos",
        coordinates: [3.382, 6.521], // Slightly shifted
        candidates: 120500,
        centres: 410,
      },
      {
        name: "Abuja",
        coordinates: [7.495, 9.072],
        candidates: 68000,
        centres: 220,
      },
      {
        name: "Kano",
        coordinates: [8.596, 12.008],
        candidates: 85000,
        centres: 275,
      },
      {
        name: "Ibadan",
        coordinates: [3.911, 7.382],
        candidates: 72000,
        centres: 250,
      },
      {
        name: "Port Harcourt",
        coordinates: [7.054, 4.811],
        candidates: 54000,
        centres: 200,
      },
      {
        name: "Kaduna",
        coordinates: [7.432, 10.531],
        candidates: 47000,
        centres: 190,
      },
      {
        name: "Enugu",
        coordinates: [7.49, 6.458],
        candidates: 49000,
        centres: 185,
      },
      {
        name: "Jos",
        coordinates: [8.897, 9.891],
        candidates: 38000,
        centres: 155,
      },
    ],

    activity: [
      {
        id: 1,
        title: "CBT centre activity detected",
        location: "Abuja",
        time: "5m ago",
        type: "success",
      },
      {
        id: 2,
        title: "Registration update received",
        location: "Kano",
        time: "21m ago",
        type: "info",
      },
      {
        id: 3,
        title: "Centre requires attention",
        location: "Kaduna",
        time: "51m ago",
        type: "warning",
      },
    ],
  },

  NECO: {
    tracking: {
      progress: 46,
      metrics: [
        {
          id: 1,
          icon: "users",
          label: "Registrations",
          value: 682000,
        },
        {
          id: 2,
          icon: "centre",
          label: "Centres",
          value: 1184,
        },
      ],
    },

    stats: {
      candidates: 682000,
      centres: 1184,
      exams: 84,
      passRate: 71,
    },

    performance: {
      health: "Stable",
      score: 79,
      uptime: 98.9,
      attendance: "89.4%",
    },

    activeUsers: {
      total: 9640,
      growth: "+4.2%",
      stats: [
        {
          id: 1,
          icon: "today",
          label: "Today",
          description: "Active candidates",
          value: 4210,
        },
        {
          id: 2,
          icon: "week",
          label: "This week",
          description: "Active candidates",
          value: 7820,
        },
        {
          id: 3,
          icon: "month",
          label: "This month",
          description: "Active candidates",
          value: 9640,
        },
      ],
    },

    performanceChart: [
      { month: "Jan", performance: 58 },
      { month: "Feb", performance: 62 },
      { month: "Mar", performance: 66 },
      { month: "Apr", performance: 70 },
      { month: "May", performance: 74 },
      { month: "Jun", performance: 79 },
    ],

    map: [
      {
        name: "Lagos",
        coordinates: [3.375, 6.53], // Shifted again
        candidates: 95000,
        centres: 310,
      },
      {
        name: "Abuja",
        coordinates: [7.485, 9.081],
        candidates: 51000,
        centres: 205,
      },
      {
        name: "Kano",
        coordinates: [8.587, 11.995],
        candidates: 71000,
        centres: 230,
      },
      {
        name: "Ibadan",
        coordinates: [3.92, 7.371],
        candidates: 59000,
        centres: 210,
      },
      {
        name: "Port Harcourt",
        coordinates: [7.045, 4.82],
        candidates: 44000,
        centres: 175,
      },
      {
        name: "Kaduna",
        coordinates: [7.445, 10.52],
        candidates: 39000,
        centres: 160,
      },
      {
        name: "Enugu",
        coordinates: [7.501, 6.448],
        candidates: 41000,
        centres: 165,
      },
      {
        name: "Jos",
        coordinates: [8.887, 9.902],
        candidates: 33000,
        centres: 140,
      },
    ],

    activity: [
      {
        id: 1,
        title: "Candidate registration increased",
        location: "Kaduna",
        time: "8m ago",
        type: "success",
      },
      {
        id: 2,
        title: "Centre data synchronized",
        location: "Enugu",
        time: "29m ago",
        type: "info",
      },
      {
        id: 3,
        title: "Verification backlog detected",
        location: "Oyo",
        time: "1h ago",
        type: "warning",
      },
    ],
  },

  NABTEB: {
    tracking: {
      progress: 91,
      metrics: [
        {
          id: 1,
          icon: "users",
          label: "Registrations",
          value: 564000,
        },
        {
          id: 2,
          icon: "centre",
          label: "Centres",
          value: 924,
        },
      ],
    },

    stats: {
      candidates: 564000,
      centres: 924,
      exams: 72,
      passRate: 81,
    },

    performance: {
      health: "Excellent",
      score: 91,
      uptime: 99.9,
      attendance: "96.2%",
    },

    activeUsers: {
      total: 7420,
      growth: "+9.1%",
      stats: [
        {
          id: 1,
          icon: "today",
          label: "Today",
          description: "Active candidates",
          value: 3210,
        },
        {
          id: 2,
          icon: "week",
          label: "This week",
          description: "Active candidates",
          value: 6180,
        },
        {
          id: 3,
          icon: "month",
          label: "This month",
          description: "Active candidates",
          value: 7420,
        },
      ],
    },

    performanceChart: [
      { month: "Jan", performance: 74 },
      { month: "Feb", performance: 78 },
      { month: "Mar", performance: 81 },
      { month: "Apr", performance: 85 },
      { month: "May", performance: 88 },
      { month: "Jun", performance: 91 },
    ],

    map: [
      {
        name: "Lagos",
        coordinates: [3.37, 6.515], // Shifted again
        candidates: 78000,
        centres: 295,
      },
      {
        name: "Abuja",
        coordinates: [7.502, 9.068],
        candidates: 39000,
        centres: 150,
      },
      {
        name: "Kano",
        coordinates: [8.601, 12.015],
        candidates: 60000,
        centres: 195,
      },
      {
        name: "Ibadan",
        coordinates: [3.908, 7.389],
        candidates: 49000,
        centres: 170,
      },
      {
        name: "Port Harcourt",
        coordinates: [7.059, 4.808],
        candidates: 36000,
        centres: 140,
      },
      {
        name: "Kaduna",
        coordinates: [7.428, 10.515],
        candidates: 31000,
        centres: 130,
      },
      {
        name: "Enugu",
        coordinates: [7.485, 6.462],
        candidates: 34000,
        centres: 135,
      },
      {
        name: "Jos",
        coordinates: [8.901, 9.888],
        candidates: 27000,
        centres: 115,
      },
    ],

    activity: [
      {
        id: 1,
        title: "Examination cycle completed",
        location: "Lagos",
        time: "12m ago",
        type: "success",
      },
      {
        id: 2,
        title: "Results processing updated",
        location: "Abuja",
        time: "34m ago",
        type: "info",
      },
      {
        id: 3,
        title: "Centre report requires review",
        location: "Rivers",
        time: "1h ago",
        type: "warning",
      },
    ],
  },
};
