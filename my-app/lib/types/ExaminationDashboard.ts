export type ExaminationStats = {
  candidates: number;
  centres: number;
  exams: number;
  passRate: number;
};

export type TrackingMetric = {
  id: number;
  icon: "centre" | "users";
  label: string;
  value: number;
};

export type TrackingData = {
  progress: number;
  metrics: TrackingMetric[];
};

export type PerformanceData = {
  health: string;
  score: number;
  uptime: number;
  attendance: string;
};

export type ActiveUserStat = {
  id: number;
  icon: "today" | "week" | "month";
  label: string;
  description: string;
  value: number;
};

export type ActiveUsersData = {
  total: number;
  growth: string;
  stats: ActiveUserStat[];
};

export type PerformanceChartItem = {
  month: string;
  performance: number;
};

export type ActivityType = "success" | "warning" | "info";

export type ExaminationActivity = {
  id: number;
  title: string;
  location: string;
  time: string;
  type: ActivityType;
};

export type ExaminationMapItem = {
  name: string;
  coordinates: [number, number];
  candidates: number;
  centres: number;
};

export type ExaminationMapData = ExaminationMapItem[];

export type ExaminationDashboardData = {
  stats: ExaminationStats;
  map: ExaminationMapData;
  tracking: TrackingData;
  performance: PerformanceData;
  activeUsers: ActiveUsersData;
  performanceChart: PerformanceChartItem[];
  activity: ExaminationActivity[];
};
