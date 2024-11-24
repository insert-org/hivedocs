import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartData = [
  { name: "Usuário", value: 275 },
  { name: "Administrador", value: 15 },
  { name: "Professor", value: 287 },
]

const barData = [
  {
    name: 'Jan',
    "Usuários": 45,
    "Professores": 30,
  },
  {
    name: 'Fev',
    "Usuários": 35,
    "Professores": 25,
  },
  {
    name: 'Mar',
    "Usuários": 40,
    "Professores": 20,
  },
  {
    name: 'Abr',
    "Usuários": 50,
    "Professores": 40,
  },
  {
    name: 'Mai',
    "Usuários": 55,
    "Professores": 45,
  },
  {
    name: 'Jun',
    "Usuários": 60,
    "Professores": 50,
  },
  {
    name: 'Jul',
    "Usuários": 65,
    "Professores": 55,
  },
  {
    name: 'Ago',
    "Usuários": 70,
    "Professores": 60,
  },
  {
    name: 'Set',
    "Usuários": 75,
    "Professores": 65,
  },
  {
    name: 'Out',
    "Usuários": 80,
    "Professores": 70,
  },
  {
    name: 'Nov',
    "Usuários": 85,
    "Professores": 75,
  },
  {
    name: 'Dez',
    "Usuários": 90,
    "Professores": 80,
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Report = () => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Usuários Registrados</p>
        <p className="text-2xl">577</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 min-h-[300px] w-96">
        <p className="font-bold text-3xl">Usuários por tipo</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Artigos criados</p>
        <p className="text-2xl">2341</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Artigos aprovados</p>
        <p className="text-2xl">930</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Autores criados</p>
        <p className="text-2xl">503</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Autores aprovados</p>
        <p className="text-2xl">178</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 min-h-[300px] w-96">
        <p className="font-bold text-3xl">Usuários registrados em 2023</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={barData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Usuários" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="Professores" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Total de avaliações</p>
        <p className="text-2xl">1322</p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-xl p-4 w-96">
        <p className="font-bold text-3xl">Total de comentários</p>
        <p className="text-2xl">649</p>
      </div>
    </div>
  );
}