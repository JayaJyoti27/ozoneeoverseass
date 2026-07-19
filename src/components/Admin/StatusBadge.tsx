import { Badge } from "@/components/ui/badge";

const COLORS: Record<string, string> = {
  applied: "bg-gray-500",
  screening: "bg-blue-600",
  shortlisted: "bg-indigo-600",
  interview: "bg-orange-600",
  documents: "bg-cyan-600",
  medical: "bg-purple-600",
  visa: "bg-pink-600",
  deployment: "bg-green-600",
  completed: "bg-emerald-700",
  rejected: "bg-red-600",
  withdrawn: "bg-slate-600",
};

interface Props {
  status?: string;
}

export default function StatusBadge({ status = "" }: Props) {
  return <Badge className={COLORS[status] ?? ""}>{status}</Badge>;
}
