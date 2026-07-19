import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function SimpleBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
