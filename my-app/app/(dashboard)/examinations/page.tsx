import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  GraduationCap,
  BookOpen,
  School,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

const exams = [
  {
    name: "WAEC",
    href: "/examinations/waec",
    description: "West African Examinations Council",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "JAMB",
    href: "/examinations/jamb",
    description: "Joint Admissions and Matriculation Board",
    icon: BookOpen,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "NECO",
    href: "/examinations/neco",
    description: "National Examinations Council",
    icon: School,
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "NABTEB",
    href: "/examinations/nabteb",
    description: "National Business & Technical Examinations Board",
    icon: ClipboardList,
    color: "from-orange-500 to-red-500",
  },
];

export default function ExaminationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Examinations"
        description="Choose an examination board to manage."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => {
          const Icon = exam.icon;

          return (
            <Link
              key={exam.name}
              href={exam.href}
              className="
                group
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card)]
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/40
                hover:shadow-xl
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className={`
                    w-14 h-14
                    rounded-xl
                    bg-gradient-to-r ${exam.color}
                    flex
                    items-center
                    justify-center
                  `}
                >
                  <Icon className="text-white" size={26} />
                </div>

                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {exam.name}
              </h2>

              <p className="mt-2 text-sm opacity-70">
                {exam.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}