import { examinationDashboards } from "@/lib/data/examinationDashboards";
import { prisma } from "@/lib/prisma";

export async function getDashboardData(
  examination: keyof typeof examinationDashboards,
) {
  const dashboard = examinationDashboards[examination];

 if (examination === "WAEC") {
  const waec = await prisma.examination.findUnique({
    where: {
      code: "WASSCE-2026",
    },
  });

  if (waec) {
    const candidateCount = await prisma.examinationRegistration.count({
      where: {
        examinationId: waec.id,
      },
    });

    const centreCount = await prisma.examinationCentre.count();

    const examinationCount = await prisma.examination.count();

    const resultCount = await prisma.result.count({
      where: {
        examinationId: waec.id,
      },
    });

    const passCount = await prisma.result.count({
      where: {
        examinationId: waec.id,
        score: {
          gte: 60,
        },
      },
    });

    const passRate =
      resultCount === 0
        ? 0
        : Math.round((passCount / resultCount) * 100);

    return {
      ...dashboard,
      stats: {
        ...dashboard.stats,
        candidates: candidateCount,
        centres: centreCount,
        exams: examinationCount,
        passRate,
      },
    };
  }
}

  return dashboard;
}
