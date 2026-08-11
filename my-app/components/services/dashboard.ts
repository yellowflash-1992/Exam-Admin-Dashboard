import { examinationDashboards } from "../../lib/data/examinationDashboards";

export async function getDashboardData(
  examination: keyof typeof examinationDashboards,
) {
  return examinationDashboards[examination];
}